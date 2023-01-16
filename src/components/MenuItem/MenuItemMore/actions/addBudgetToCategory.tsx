import { addTransaction } from '../../../../services/backend'

export async function addBudgetToCategory({ category, amount, transactionNature, tags }) {
  return addTransaction({
    type: 'transfer',
    amount,
    tags,
    sender: {
      type: 'wallet',
      name: 'Main wallet',
      id: 'main',
    },
    recipient: {type: 'category', ...category},
    transactionNature: transactionNature || 'Nature not specified',
  })
}
