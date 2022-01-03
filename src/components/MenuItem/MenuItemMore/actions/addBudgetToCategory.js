import { addTransaction } from '../../../../services/backend'

export async function addBudgetToCategory({ category, amount, transactionNature }) {
  return addTransaction({
    type: 'transfer',
    amount,
    sender: {
      type: 'wallet',
      name: 'Main wallet',
      id: 'main',
    },
    recipient: {type: 'category', ...category},
    transactionNature: transactionNature || 'Nature not specified',
  })
}
