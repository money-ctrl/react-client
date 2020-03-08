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
      ? {}
      : lastTransaction.data()

    const totalBefore = (lastTransaction.totalBefore + lastTransaction.amount) || 0

    const createPayload = ({ amount, sender, recipient }) => ({
      createdAt: new Date(),
      totalBefore: totalBefore || 0,
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
      database().set({
        total: payload.amount + payload.totalBefore,
      }, { merge: true })
    } else if (expense) {
      const payloadBase = {
        ...expense,
        sender: 'moneySource:main',
      }

      const transactionPayload = await getLastTransaction({
        collection: database().collection('transactions'),
      })
        .then(transaction => transaction.createPayload(payloadBase))

      database().collection('transactions').doc().set(transactionPayload)
      database().set({
        total: transactionPayload.totalBefore - transactionPayload.amount,
      }, { merge: true })

      const categoryPayload = await getLastTransaction({
        collection: database().collection('expenseCategories')
          .doc(expense.categoryId)
          .collection('transactions'),
      })
        .then(transaction => transaction.createPayload(payloadBase))

      database().collection('expenseCategories')
        .doc(expense.categoryId)
        .collection('transactions')
        .doc()
        .set(categoryPayload)
      database().collection('expenseCategories')
        .doc(expense.categoryId)
        .set({
          amount: categoryPayload.amount + categoryPayload.totalBefore,
        }, { merge: true })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    alert(error)
  }
}
