import { resourceId } from '@/utils'

export const categoryPresenter = (category) => {
  if (!category) return

  const futureDeductions = (category.scheduled || [])
    .reduce((sum, current) => {
      return sum + current.transactionPayload.amount
    }, 0)

  const extras = {
    type: 'category',
    resourceId: resourceId({ id: category.id, type: 'category' }),
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

export const categoryCreate = (values) => {
  const defaultCategory = {
    name: '',
    allocated: 0,
    amount: 0,
    debt: 0,
    scheduled: [],
    visible: true,
  }

  return {
    ...defaultCategory,
    ...values,
  }
}
