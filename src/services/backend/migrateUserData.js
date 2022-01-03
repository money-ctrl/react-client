import { firebase, db } from '../firebase'

export default async function migrateUserData(database) {
  let { version } = await database().get().then(ref => ({version:1, ...ref.data()}))

  if (version === 1) (await upgradeV1toV2(database), ++version)
  if (version === 2) (await upgradeV2toV3(database), ++version)
}

/**
 * Migrate to v2:
 * - [x] `total` to `amount`
 * - [x] `currentCycle` gets deleted
 * - [x] `moneySources` gets deleted
 * - [x] categories `limit` is renamed to `allocated`
 * - [x] categories transactions gets deleted in favor of a
 *       centralized transactions for the user
 * - [x] now category amount gets decresed instead of increased on expense
 */
async function upgradeV1toV2(database) {
  const batch = db.batch()

  const { total } = await database().get().then(ref => ({version:1, ...ref.data()}))
  batch.set(database(), {
    amount: total,
    version: 2,
  })

  const categories = await database().collection('expenseCategories').get().then(snapshot => snapshot.docs)
  await Promise.all(categories.map(async (snapshot) => {
    const doc = snapshot.data()

    batch.set(snapshot.ref, {
      amount: doc.limit - doc.amount,
      allocated: doc.limit,
      name: doc.name,
      visible: doc.visible
    })

    const transactions = await snapshot.ref.collection('transactions').get().then(snapshot => snapshot.docs)
    transactions.forEach(snapshot => {
      batch.delete(snapshot.ref)
    })
  }))

  batch.commit()

  console.log('[migration] upgrade to v2 successfully')
}

/**
 * Plans for v3
 * - [x] Change money to cents
 * - [ ] won't fix: don't remember motivation -- apply "tags" for every transaction
 * - [x] add "createdAt" fields retroactively to "schedules" and "categories"
 */
async function upgradeV2toV3(database) {
  const batch = db.batch()

  const toCents = value => Math.trunc(value * 100)

  const userRoot = await database().get().then(ref => ref.data())
  batch.set(database(), {
    amount: toCents(userRoot.amount),
    version: 3,
  }, { merge: true })

  const categories = await database().collection('expenseCategories').get().then(snapshot => snapshot.docs)
  categories.forEach((snapshot) => {
    const doc = snapshot.data()

    batch.set(snapshot.ref, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //
      allocated: toCents(doc.allocated),
      amount: toCents(doc.amount),
      debt: toCents(doc.debt),
      scheduled: doc.scheduled.map(scheduledPayment => ({
        ...scheduledPayment,
        transactionPayload: {
          ...scheduledPayment.transactionPayload,
          amount: toCents(scheduledPayment.transactionPayload.amount),
        },
      }))
    }, { merge: true })
  })

  const schedules = await database().collection('schedules').get().then(snapshot => snapshot.docs)
  schedules.forEach((snapshot) => {
    const doc = snapshot.data()

    batch.set(snapshot.ref, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //
      transactionPayload: {
        ...doc.transactionPayload,
        amount: toCents(doc.transactionPayload.amount),
      },
    }, { merge: true })
  })

  batch.commit()

  // batch has a limit of 500 operations, transactions weren't gonna fit in
  // there for sure, so we are compromising in updating them outside the batch
  // (sad).
  const transactions = await database().collection('transactions').get().then(snapshot => snapshot.docs)
  await Promise.all(transactions.map((snapshot) => {
    const doc = snapshot.data()

    return snapshot.ref.set({
      amount: toCents(doc.amount),
    }, { merge: true })
  }))

  console.log('[migration] upgrade to v3 successfully')
}
