import { db } from '../firebase'

export default async function migrateUserData(database) {
  let { version } = await database().get().then(ref => ({version:1, ...ref.data()}))

  if (version === 1) await upgradeV1toV2(database)
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
}

/**
 * Plans for v3
 * - [ ] Change money to cents
 * - [ ] apply "tags" for every transaction
 */
