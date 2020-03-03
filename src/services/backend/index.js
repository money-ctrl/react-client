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

export const userLogout = async () => {
  await firebase.auth().signOut()
    .catch(console.error) // eslint-disable-line no-console
}

export const database = () => {
  const userUId = firebase.auth().currentUser.uid

  return db.collection('users').doc(userUId)
}

export const addTransaction = async ({ income }) => {
  try {
    let lastTransactionQuery
    lastTransactionQuery = await database().collection('transactions')
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

    if (income) {
      const payload = createPayload({
        ...income,
        sender: 'reason:salary',
        recipient: 'moneySource:main',
      })

      await database().collection('transactions').doc().set(payload)
      return database().update({
        total: payload.amount + payload.totalBefore,
      })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    alert(error)
  }
}
