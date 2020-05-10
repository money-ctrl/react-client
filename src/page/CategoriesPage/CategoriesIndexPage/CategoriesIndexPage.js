import './CategoriesIndexPage.css'
import React from 'react'
import Title from '../../../ui/Title'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../ui/Loading'
import Card from '../../../ui/Card'
import MoneyDisplay from '../../../components/MoneyDisplay'
import Overdrive from 'react-overdrive'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { database } from '../../../services/backend'

function CategoriesIndexPage() {
  const history = useHistory()

  const { categoryId } = useParams()
  const category = useSelector(state => state.categories.ids[categoryId])

  if (!category) return <Loading/>

  const editCategory = () => {
    const newExpenseCategory = {
      name: prompt('New category name', category.name),
      allocated: Number(prompt('What is the total amount you want to allocate for expenses in this category?', category.allocated)),
    }

    if (!newExpenseCategory.name) return
    if (!newExpenseCategory.allocated) return

    database().collection('expenseCategories')
      .doc(categoryId)
      .set(newExpenseCategory, {merge: true})
  }

  const deleteCategory = () => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    database().collection('expenseCategories')
      .doc(categoryId)
      .set({ visible: false }, {merge: true})

    history.goBack()
  }

  return (<>
    <TopNavigationLayout
      onBackPress={history.goBack}
      actions={[{
        icon: 'trash',
        onClick: deleteCategory,
      }, {
        icon: 'cog',
        onClick: editCategory,
      }]}
    >
      <Title title={category.name} />

      <Overdrive id={`category-card-${categoryId}`}>
        <Card className="categories-index-page__card">
          <MoneyDisplay
            value={category.amount}
          />

          <div className="categories-index-page__slash">/</div>

          <MoneyDisplay
            value={category.allocated}
            size="xxs"
          />
        </Card>
      </Overdrive>

      <div className="mt-l">
        <Title tag="h2" title="Lastest spending" />
      </div>
    </TopNavigationLayout>
  </>)
}

export default CategoriesIndexPage
