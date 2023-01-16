import { createSchedule } from '../../../../services/backend'

export async function schedulePayment({
  category,
  amount,
  transactionNature = 'Nature not specified',
  tags,
  repeatCount = Infinity,
  triggerType = 'manual',
}) {
  return createSchedule({
    type: 'expense',
    transactionNature,
    tags,
    amount,
    repeatCount,
    triggerType,
    sender: {type: 'category', ...category},
    recipient: {
      type: 'reason',
      name: 'Unknown',
      id: 'unknown',
    },
  })
}
