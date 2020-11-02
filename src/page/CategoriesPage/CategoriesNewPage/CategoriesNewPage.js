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
      allocated: Number(prompt('What is the total amount you want to allocate for expenses in this category?')),
      amount: 0,
      visible: true,
      scheduled: [],
    }

    if (!newExpenseCategory.name) return
    if (!newExpenseCategory.allocated) return

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
