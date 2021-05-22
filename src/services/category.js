export const categoryPresenter = (category) => {
  if (!category) return

  const futureDeductions = (category.scheduled || [])
    .reduce((sum, current) => {
      return sum + current.transactionPayload.amount
    }, 0)

  const extras = {
    futureDeductions,
    amountWithDeductions: category.amount - futureDeductions,
  }

  return new Proxy(category, {
    get(target, key) {
      if (target[key] === undefined) {
        return extras[key]
      }

      return target[key]
    },
  })
}
