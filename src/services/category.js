export const categoryPresenter = (category) => {
  if (!category) return

  const futureDeductions = (category.scheduled || [])
    .reduce((sum, current) => {
      return sum + current.transactionPayload.amount
    }, 0)

  return {
    futureDeductions,
    amountWithDeductions: category.amount - futureDeductions,
    ...category,
  }
}
