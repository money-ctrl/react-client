import { addTransaction, scheduleTransactionToCategory, processDebt  } from '../../../../services/backend'

export async function resetCycle({ categories }) {
  return await Promise.all(categories.map((category) => {
    const subpromises = [
      processDebt(category),

      addTransaction({
        type: 'transfer',
        amount: category.allocated,
        sender: {
          type: 'wallet',
          name: 'Main wallet',
          id: 'main',
        },
        recipient: {type: 'category', ...category},
        transactionNature: 'Cycle reset',
      }),

      scheduleTransactionToCategory({ category }),
    ]

    return Promise.all(subpromises)
  }))
}

