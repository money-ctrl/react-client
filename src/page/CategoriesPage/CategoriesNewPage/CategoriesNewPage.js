import React from 'react'
import { useHistory } from 'react-router-dom'
import { database } from '../../../services/backend'
import Button from '../../../ui/Button'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'

function CategoriesPageNew() {
  const history = useHistory()

  const addNewCategory = () => {
    const newExpenseCategory = {
      name: prompt('New category name'),
      limit: Number(prompt('What is the limit for this category')),
      amount: 0,
      visible: true,
    }

    if (!newExpenseCategory.name) return
    if (!newExpenseCategory.limit) return

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
