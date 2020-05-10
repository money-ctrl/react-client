import {
  db,
  firebase
} from '../firebase'

export { default as migrateUserData } from './migrateUserData'

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

export const resourceIdentifier = ({type, id}) => `${type}:${id}`

export async function addTransaction({ amount, sender, recipient, type, transactionNature }) {
  try {
    validateArguments(...arguments)

    const payload = {
      type,
      amount,
      createdAt: new Date(),
      sender: resourceIdentifier(sender),
      recipient: resourceIdentifier(recipient),
      relatedParties: [resourceIdentifier(sender), resourceIdentifier(recipient)],
      displayData: {
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

export function getLastestTransactions({ category, callback }) {
  return database()
    .collection('transactions')
    .where('relatedParties', 'array-contains', resourceIdentifier(category))
    .orderBy('createdAt', 'desc')
    .limit(25)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map(i => i.data()))
    })
}
