import {
  db,
  firebase
} from '../firebase'
import { resourceId } from '../../utils'

export { default as migrateUserData } from './migrateUserData'

// Add a counter for observing reads happening, to easily infinite loops leading to quota exceeding.
window.firestoreRead = 0

export const enablePersistence = () => {
  db.enablePersistence()
    .catch((error) => {
      if (error.code === 'failed-precondition') {
        alert(
          'Multiple tabs open, off-line mode can only be enabled in one '+
          'tab at a time. Close all tabs and try again.')
      } else if (error.code === 'unimplemented') {
        alert(
          'The current browser does not support all of the '+
          'features required to enable persistence.')
      }
    })
}

export const userLogout = () => {
  return firebase.auth().signOut()
    .catch(console.error) // eslint-disable-line no-console
}

export const database = () => {
  const userUId = firebase.auth().currentUser.uid

  return db.collection('users').doc(userUId)
}

export function getAllTransactionsByTag(tag) {
  return database()
    .collection('transactions')
    .where('displayData.tags', 'array-contains', tag)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    })
    .catch(error => {
      alert('[ERROR]:', error)
      return []
    })
}

export function updateCategory(id, override) {
  return database()
    .collection('expenseCategories')
    .doc(id)
    .set(override, {merge: true})
}

export function processDebt(category) {
  const calculateNewBalance = (category) => {
    const currentDebt = category.debt || 0

    const isAmountNegative = category.amount < 0
    const isDebtGreaterThanAvailableAmount = Math.abs(currentDebt) > category.amount
    const canPayDebt = !isDebtGreaterThanAvailableAmount

    if (isAmountNegative) {
      return {
        amount: 0,
        debt: currentDebt + category.amount,
      }
    }
    else if (isDebtGreaterThanAvailableAmount) {
      return {
        amount: 0,
        debt: currentDebt + category.amount,
      }
    }
    else if (canPayDebt) {
      return {
        amount: category.amount + currentDebt,
        debt: 0,
      }
    }

    // this should never be run, but just in case
    return {}
  }

  return updateCategory(category.id, calculateNewBalance(category))
}

export async function addTransaction({ amount, sender, recipient, type, transactionNature }) {
  try {
    validateArguments(...arguments)

    const payload = {
      type,
      amount,
      createdAt: new Date(),
      sender: resourceId(sender),
      recipient: resourceId(recipient),
      relatedParties: [resourceId(sender), resourceId(recipient)],
      displayData: {
        tags: [],
        sender: sender.name,
        recipient: recipient.name,
        transactionNature,
      },
    }

    database().collection('transactions').doc().set(payload)

    const applyTransaction = async (path, { partyType, party }) => {
      const modifier = { 'sender': -1, 'recipient': 1 }
      const amount = payload.amount * modifier[partyType]

      const {
        amount: previousAmount,
      } = await path(party.id).get().then(ref => ref.data() || {})

      return path(party.id).set({ amount: (previousAmount||0) + amount }, {merge:true})
    }

    const collections = {
      'category': (id) => database().collection('expenseCategories').doc(id),
      'wallet': () => database(),
    }

    const transactions = []

    if (['wallet', 'category'].includes(sender.type)) {
      transactions.push(
        applyTransaction(collections[sender.type], {
          partyType: 'sender',
          party: sender,
        })
      )
    }

    if (['wallet', 'category'].includes(recipient.type)) {
      transactions.push(
        applyTransaction(collections[recipient.type], {
          partyType: 'recipient',
          party: recipient,
        })
      )
    }

    return Promise.all(transactions)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    alert(error)
  }
}

function validateArguments({type, amount, sender, recipient}) {
  if (!['income', 'expense', 'transfer'].includes(type))
    throw new Error(`Invalid transaction type: ${type}`)

  if (typeof amount !== 'number')
    throw new Error(`Invalid amount type: ${typeof amount}`)

  const validateResourceIdentifierType = ({type}) => ![
    'category',
    'reason',
    'wallet'
  ].includes(type)
  if (validateResourceIdentifierType(sender) || validateResourceIdentifierType(recipient))
    throw new Error(`Sender with invalid type: ${sender.type}`)
  if (validateResourceIdentifierType(recipient))
    throw new Error(`Recipient with invalid type: ${recipient.type}`)
}

export function getLastestTransactions({ category, callback, limit = 25 }) {
  return database()
    .collection('transactions')
    .where('relatedParties', 'array-contains', resourceId(category))
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .onSnapshot((snapshot) => {
      ++window.firestoreRead
      callback(snapshot.docs.map(i => ({
        ...i.data(),
        id: i.id,
      })), snapshot.size)
    })
}

export function setTransaction({ id, ...transaction }) {
  database()
    .collection('transactions')
    .doc(id)
    .set(transaction, { merge: true })
}

function filterCategory(category) {
  const allowed = [
    'type',
    'id',
    'name',
  ]

  return Object.fromEntries(
    allowed.map(key => [
      key,
      category[key],
    ]),
  )
}

export function createSchedule({ repeatCount, sender, recipient, type, amount, transactionNature }) {
  return database()
    .collection('schedules')
    .doc()
    .set({
      transactionPayload: {
        type,
        transactionNature,
        amount,
        sender: filterCategory(sender),
        recipient: filterCategory(recipient),
      },
      categoryId: sender.id,
      repeatCount,
      triggerType: 'manual',
    })
}

export async function scheduleTransactionToCategory({ category }) {
  const scheduleIds = await database()
    .collection('schedules')
    .where('categoryId', '==', category.id)
    .get()
    .then(query => query.docs
      .map(ref => ({
        id: ref.id,
        ...ref.data(),
      })))

  return database()
    .collection('expenseCategories')
    .doc(category.id)
    .set({
      scheduled: scheduleIds,
    }, { merge: true })
}

export async function descheduleTransaction({ schedule }) {
  return database()
    .collection('expenseCategories')
    .doc(schedule.categoryId)
    .set({
      scheduled: firebase.firestore.FieldValue.arrayRemove(schedule),
    }, { merge: true })
}
