import { createSchedule } from '../../../../services/backend'

export async function schedulePayment({ category, amount, transactionNature }) {
  return createSchedule({
    type: 'expense',
    transactionNature: transactionNature || 'Nature not specified',
    amount,
    sender: {type: 'category', ...category},
    recipient: {
      type: 'reason',
      name: 'Unknown',
      id: 'unknown',
    },
    repeatCount: Infinity,
  })
}
