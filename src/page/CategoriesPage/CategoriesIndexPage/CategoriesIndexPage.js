import './CategoriesIndexPage.css'
import React, { useState, useEffect } from 'react'
import Title from '../../../ui/Title'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../ui/Loading'
import Card from '../../../ui/Card'
import Icon from '../../../ui/Icon'
import MoneyDisplay from '../../../components/MoneyDisplay'
import Overdrive from 'react-overdrive'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { database, getLastestTransactions } from '../../../services/backend'

function CategoriesIndexPage() {
  const history = useHistory()

  const { categoryId } = useParams()
  const category = useSelector(state => state.categories.ids[categoryId])

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const unsubscribe = getLastestTransactions({
      category: { ...category, type: 'category' },
      callback: setTransactions,
    })

    return unsubscribe
  }, [category])

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
        <Title tag="h2" title="Lastest transactions" />

        <ol className="categories-index-page__spending-list mt-s">
          {transactions.map(transaction =>
            <li
              key={transaction.createdAt}
              className="categories-index-page__spending-item"
            >
              <Icon
                size="l"
                className="categories-index-page__spending-icon"
                {...iconType(transaction.type)}
              />

              <span className="categories-index-page__spending-title">
                {transaction.displayData.sender} <Icon name="angle-double-right" /> {transaction.displayData.recipient}
              </span>

              <MoneyDisplay
                size="xxs"
                monochromatic={true}
                value={transaction.amount}
              />

              <span className="categories-index-page__spending-desc">
                {transaction.displayData.transactionNature}
              </span>

              <span className="categories-index-page__spending-created-at">
                {getDateString(transaction.createdAt)}
              </span>
            </li>
          )}
        </ol>
      </div>
    </TopNavigationLayout>
  </>)
}

const getDateString = ({ seconds, nanoseconds }) => {
  const milliseconds = seconds * 1000 + nanoseconds / 1000000

  return new Date(milliseconds).toLocaleString()
}

const iconType = (type) => {
  return {
    'transfer': {
      name: 'exchange-alt',
      style: {
        color: '#9a73e4',
      },
    },
    'expense': {
      name: 'shopping-cart',
      style: {
        color: '#da7a98',
      },
    },
  }[type] || { name: 'question-circle', }
}

export default CategoriesIndexPage
