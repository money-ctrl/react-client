import React from 'react'
import { useHistory } from 'react-router-dom'
import { database } from '../../../services/backend'
import Button from '../../../ui/Button'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { categoryCreate } from '../../../services/category'

function CategoriesPageNew() {
  const history = useHistory()

  const addNewCategory = () => {
    const newExpenseCategory = categoryCreate({
      name: prompt('New category name'),
      allocated: Number(prompt('What is the total amount you want to allocate for expenses in this category?')),
    })

    if (!newExpenseCategory.name) return
    if (!newExpenseCategory.allocated && newExpenseCategory.allocated !== 0) return

    const docRef = database().collection('expenseCategories').doc()

    docRef.set(newExpenseCategory)

    history.replace(`/categories/${docRef.id}`)
  }

  return (
    <TopNavigationLayout onBackPress={history.goBack}>
      <Button onClick={addNewCategory} variant="primary" behavior="block">
        Add new Category
      </Button>
    </TopNavigationLayout>
  )
}

export default CategoriesPageNew
