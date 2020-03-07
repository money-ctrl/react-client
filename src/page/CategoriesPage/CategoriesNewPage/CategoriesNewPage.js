import React, { useEffect } from 'react'
import { database } from '../../../services/backend'

function CategoriesPageNew() {
  useEffect(() => {
    const newExpenseCategory = {
      name: prompt('New category name'),
      limit: Number(prompt('What is the limit for this category')),
      amount: 0,
    }

    if (!newExpenseCategory.name) return
    if (!newExpenseCategory.limit) return

    database().collection('expenseCategories')
      .doc()
      .set(newExpenseCategory)
  }, [])

  return (
    <div>
      new
    </div>
  )
}

export default CategoriesPageNew
