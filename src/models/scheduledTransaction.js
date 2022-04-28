export const exemple = {
  categoryId: 'qyKDuLwRLXsleN2g8GKe',
  createdAt: {
    // firebase date
    seconds: 0,
    nanoseconds: 0,
  },
  repeatCount: Infinity || Number(), // decremented on each cycle
  transactionPayload: {
    amount: 799, // cents
    recipient: {
      id: 'unknown',
      name: 'Unknown',
      type: 'reason',
    },
    sender: {
      id: 'qyKDuLwRLXsleN2g8GKe',
      name: 'doações',
      type: 'category',
    },
    transactionNature: 'YouTube Membership: Dropout',
    type: 'expense',
  },
  triggerType: 'manual' || 'onCycleReset',
}
