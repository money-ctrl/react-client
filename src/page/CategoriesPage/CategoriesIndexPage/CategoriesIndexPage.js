import './CategoriesIndexPage.css'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Title from '../../../ui/Title'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../ui/Loading'
import Card from '../../../ui/Card'
import Icon from '../../../ui/Icon'
import MoneyDisplay from '../../../components/MoneyDisplay'
import Overdrive from 'react-overdrive'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { database, getLastestTransactions, setTransaction } from '../../../services/backend'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getTypeIdFromResourceId } from '../../../utils'

dayjs.extend(relativeTime)

const getDateString = ({ seconds, nanoseconds }) => {
  const milliseconds = seconds * 1000 + nanoseconds / 1000000

  return dayjs(milliseconds).fromNow()
}

const iconType = ({ type, sender }) => {
  const { type: subtype } = getTypeIdFromResourceId(sender)
  return {
    'transfer': {
      'wallet': {
        name: 'wallet',
        style: {
          color: '#5bbaa4',
        },
      },
      'category': {
        name: 'exchange-alt',
        style: {
          color: '#9a73e4',
        },
      },
    },
    'expense': new Proxy({}, {
      get: () => ({
        name: 'shopping-cart',
        style: {
          color: '#da7a98',
        },
      }),
    }),
  }[type][subtype] || { name: 'question-circle' }
}

const editTransactionNature = (transaction) => {
  const newTransactionNature = window.prompt('Edit transaction nature:', transaction.displayData.transactionNature)

  if (!newTransactionNature) {
    window.alert('A transaction nature is required, falling back to previous.')
    return
  }

  setTransaction({
    ...transaction,
    displayData: {
      ...transaction.displayData,
      transactionNature: newTransactionNature,
    },
  })
}

function CategoriesIndexPage() {
  const history = useHistory()

  const { categoryId } = useParams()
  const category = useSelector(state => state.categories.ids[categoryId])

  const [transactions, setTransactions] = useState([])
  const [isLoadingTransactions, setLoadingTransactions] = useState(true)

  useEffect(() => {
    if (!category) return

    const unsubscribe = getLastestTransactions({
      category: { ...category, type: 'category' },
      callback: (transactions) => {
        setTransactions(transactions)
        setLoadingTransactions(false)
      },
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
        <LastestTransactions {...{
          transactions,
          category,
          isLoadingTransactions,
        }} />
      </div>
    </TopNavigationLayout>
  </>)
}

function LastestTransactions({ transactions, category, isLoadingTransactions}) {
  return (<>
    <Title tag="h2" title="Lastest transactions" />

    {isLoadingTransactions && <Loading style={{ marginTop: '64px' }} />}

    <ol className="categories-index-page__spending-list mt-s">
      {transactions.map(transaction =>
        <li
          key={transaction.createdAt}
          className="categories-index-page__spending-item"
        >
          <Icon
            size="l"
            className="categories-index-page__spending-icon"
            {...iconType(transaction)}
          />

          <span className="categories-index-page__spending-title">
            {transaction.displayData.recipient === category.name ? (<>
              {transaction.displayData.sender} <Icon name="angle-double-right" />
            </>) : (<>
              <Icon name="angle-double-right" /> {transaction.displayData.recipient}
            </>)}
          </span>

          <MoneyDisplay
            size="xxs"
            monochromatic={true}
            value={transaction.amount * (transaction.displayData.recipient === category.name ? 1 : -1)}
          />

          <button
            className="categories-index-page__spending-desc"
            onClick={() => editTransactionNature(transaction)}
          >
            {transaction.displayData.transactionNature}
          </button>

          <span className="categories-index-page__spending-created-at">
            {getDateString(transaction.createdAt)}
          </span>
        </li>
      )}
    </ol>
  </>)
}

LastestTransactions.propTypes = {
  isLoadingTransactions: PropTypes.bool,
  category: PropTypes.shape({ name: PropTypes.string }),
  transactions: PropTypes.array,
}

export default CategoriesIndexPage
