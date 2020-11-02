import { addTransaction, scheduleTransactionToCategory } from '../../../../services/backend'

export async function resetCycle({ categories }) {
  for (const category of categories) {
    await addTransaction({
      type: 'transfer',
      amount: category.allocated,
      sender: {
        type: 'wallet',
        name: 'Main wallet',
        id: 'main',
      },
      recipient: {type: 'category', ...category},
      transactionNature: 'Cycle reset',
    })

    scheduleTransactionToCategory({ category })
  }
}
