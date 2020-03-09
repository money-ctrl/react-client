import {
  db,
  firebase
} from '../firebase'

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

export const addTransaction = async ({ income, expense }) => {
  const getLastTransaction = async ({collection}) => {
    const lastTransactionQuery = await collection
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()

    let [lastTransaction] = lastTransactionQuery.docs
    const isFirstTransaction = !lastTransaction

    lastTransaction = isFirstTransaction
      ? { totalBefore: 0, amount: 0 }
      : lastTransaction.data()

    const totalBefore = lastTransaction.totalBefore + lastTransaction.amount

    const createPayload = ({ amount, sender, recipient }) => ({
      createdAt: new Date(),
      totalBefore,
      sender,
      recipient,
      amount,
      verified: isFirstTransaction, // the root is thrust worthy
    })

    return { createPayload }
  }

  try {
    if (income) {
      const payload = await getLastTransaction({
        collection: database().collection('transactions')
      })
        .then(transaction => transaction.createPayload({
          ...income,
          sender: 'reason:salary',
          recipient: 'moneySource:main',
        }))

      database().collection('transactions').doc().set(payload)
      const { total } = await database().get().then(docRef => docRef.data() || { total: 0 })
      database().set({
        total: total + payload.amount,
      }, { merge: true })
    } else if (expense) {
      const payloadBase = {
        ...expense,
        sender: 'moneySource:main',
      }

      const mainSection = (async () => {
        const transactionPayload = await getLastTransaction({
          collection: database().collection('transactions'),
        })
          .then(transaction => transaction.createPayload(payloadBase))

        database().collection('transactions').doc().set(transactionPayload)
        const { total } = await database().get().then(docRef => docRef.data() || { total: 0 })
        database().set({
          total: total - transactionPayload.amount,
        }, { merge: true })
      })()

      const categorySection = (async () => {
        const categoryPayload = await getLastTransaction({
          collection: database().collection('expenseCategories')
            .doc(expense.categoryId)
            .collection('transactions'),
        })
          .then(transaction => transaction.createPayload(payloadBase))

        const category = database().collection('expenseCategories')
          .doc(expense.categoryId)

        category.collection('transactions').doc().set(categoryPayload)
        const { amount } = await category.get().then(docRef => docRef.data() || { amount: 0 })
        category.set({
          amount: amount + categoryPayload.amount,
        }, { merge: true })
      })()

      Promise.all([mainSection, categorySection])
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    alert(error)
  }
}
