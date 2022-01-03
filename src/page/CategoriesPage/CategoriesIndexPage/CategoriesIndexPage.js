import './CategoriesIndexPage.css'
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Title from '../../../ui/Title'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { contextAssign } from '../../../actions'
import Loading from '../../../ui/Loading'
import Card from '../../../ui/Card'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import MoneyDisplay from '../../../components/MoneyDisplay'
import Overdrive from 'react-overdrive'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { database, getLastestTransactions, setTransaction, addTransaction, updateCategory } from '../../../services/backend'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { getTypeIdFromResourceId, resourceId } from '../../../utils'
import { descheduleTransaction } from '../../../services/backend'
import Divider from '../../../ui/Divider'
import { categoryPresenter } from '../../../services/category'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const getDateString = ({ seconds, nanoseconds }) => {
  const milliseconds = seconds * 1000 + nanoseconds / 1000000

  const now = dayjs(Date.now())
  const then = dayjs(milliseconds)

  return (now.diff(then, 'week') > 0)
    ? then.format('YYYY/MM/DD - HH:mm')
    : then.fromNow()
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

const editTransactionTags = (transaction) => {
  const newTags = window.prompt(
    'Edit transaction nature (comma separated):',
    (transaction.displayData.tags || []).join(','),
  )

  // null == canceled
  if (newTags === null) return

  const newTagsArray = (newTags === '') ? [] : newTags.split(',')

  setTransaction({
    ...transaction,
    displayData: {
      ...transaction.displayData,
      tags: newTagsArray,
    },
  })
}

function CategoriesIndexPage() {
  const history = useHistory()

  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const category = categoryPresenter(useSelector(state => state.categories.ids[categoryId]))

  const categoryTotalSchedules = useSelector(state => {
    return state.schedules.list
      .filter(schedule => schedule.categoryId === (category || {}).id)
      .reduce((total, schedule) => total + schedule.transactionPayload.amount, 0)
  })

  const [transactions, setTransactions] = useState([])
  const [limit, setLimit] = useState(25)
  const [size, setSize] = useState(limit)
  const [isLoadingTransactions, setLoadingTransactions] = useState(true)
  const shouldFetchMoreTransactions = size === limit

  useEffect(() => {
    if (!category) return

    const unsubscribe = getLastestTransactions({
      limit,
      category,
      callback: (transactions, snapshotSize) => {
        setTransactions(transactions)
        setSize(snapshotSize)
        setLoadingTransactions(false)
      },
    })

    return unsubscribe
  }, [(category || {}).resourceId, limit])

  const infinityLoader = useRef(null)
  useEffect(() => {
    const target = infinityLoader.current
    const observer = new IntersectionObserver(([target]) => {
      if (!target.isIntersecting) return
      if (!shouldFetchMoreTransactions) return
      setLimit((limit) => limit + 25)
    }, { rootMargin: '-20px', threshold: 1.0 })
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [isLoadingTransactions, shouldFetchMoreTransactions])

  if (!category) return <Loading/>

  const renameCategory = () => {
    const name = prompt('New category name', category.name)
    if (!name) return

    database().collection('expenseCategories')
      .doc(categoryId)
      .set({ name }, {merge: true})
  }

  const categoryEditAllocation = () => {
    const allocated = Number(prompt('What is the total amount (in cents) you want to allocate for expenses in this category?', category.allocated))

    if (!allocated) return

    database().collection('expenseCategories')
      .doc(categoryId)
      .set({ allocated }, {merge: true})
  }

  const categoryPayDebt = () => {
    const value = Number(prompt('How much (in cents) to pay debt?'))

    if (!value) return

    database().collection('expenseCategories')
      .doc(categoryId)
      .set({
        amount: category.amount - value,
        debt: category.debt + value,
      }, { merge: true })
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
        title: 'Edit category menu',
        icon: 'cog',
        onClick: () => dispatch(contextAssign({
          optionList: [
            {
              label: 'Rename category',
              onClick: renameCategory,
            },
            {
              label: 'Change total allocated',
              onClick: categoryEditAllocation,
            },
            {
              label: 'Pay debt',
              onClick: categoryPayDebt,
            },
            {
              label: 'Delete Category',
              variant: 'danger',
              onClick: deleteCategory,
            },
          ],
        })),
      }]}
    >
      <Title title={category.name} />

      <Overdrive id={`category-card-${categoryId}`}>
        <Card className="categories-index-page__card">
          <div className="categories-index-page__card-balance">
            <MoneyDisplay
              value={category.amount}
            />

            <div className="categories-index-page__slash">/</div>

            <MoneyDisplay
              value={category.allocated}
              size="xxs"
            />
          </div>

          {(!!categoryTotalSchedules || (category.debt < 0))
            && <Divider variant="dark" space="m" />}

          {(!!categoryTotalSchedules) && <MoneyDisplay
            orientation="horizontal"
            label="total scheduled"
            value={categoryTotalSchedules}
            size="xs"
          />}

          {(category.debt < 0) && <MoneyDisplay
            orientation="horizontal"
            label={'debt'}
            value={category.debt}
            size={'xs'}
          />}
        </Card>
      </Overdrive>

      <div className="mt-l">
        {category.scheduled && category.scheduled.length > 0
            && <ScheduledTransactions {...{ category }} />}

        <LastestTransactions {...{
          transactions,
          category,
          isLoadingTransactions,
        }} />

        {shouldFetchMoreTransactions && <div className="mt-s" ref={infinityLoader}>
          <Loading size="m" />
          <p className="categories-index-page__loading-text">Loading more transactions</p>
        </div>}
      </div>
    </TopNavigationLayout>
  </>)
}

function ScheduledTransactions({ category }) {
  const dispatch = useDispatch()

  const commit = (id, transaction) => {
    addTransaction(transaction)
    updateCategory(category.id, {
      scheduled: category.scheduled.filter(transaction => transaction.id !== id),
    })
  }

  return (<>
    <Title tag="h2" title="Scheduled transactions" />

    <ul className="categories-index-page__spending-list mt-s mb-l">
      {category.scheduled.map((schedule) => {
        const { id, transactionPayload: transaction} = schedule

        return (
          <li
            key={id}
            className="categories-index-page__spending-item"
          >
            <Icon
              size="l"
              className="categories-index-page__spending-icon"
              {...iconType({ ...transaction, sender: resourceId(transaction.sender)})}
            />

            <span className="categories-index-page__spending-title">
              {transaction.recipient.name === category.name ? (<>
                {transaction.sender.name} <Icon name="angle-double-right" />
              </>) : (<>
                <Icon name="angle-double-right" /> {transaction.recipient.name}
              </>)}
            </span>

            <MoneyDisplay
              size="xxs"
              monochromatic={true}
              value={transaction.amount * (transaction.recipient.name === category.name ? 1 : -1)}
            />

            <span
              className="categories-index-page__spending-desc"
            >
              {transaction.transactionNature}
            </span>

            <div className="categories-index-page__spending-action">
              <Button size="small" onClick={() => commit(id, transaction)}>
              commit
              </Button>

              <Button
                size="small"
                onClick={() => dispatch(contextAssign({
                  optionList: [
                    {
                      label: 'Remove for this cycle',
                      onClick: () => descheduleTransaction({ schedule }),
                    },
                  ],
                }))}
              >
                <Icon name="ellipsis-v" aria-label="more" role="img" />
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  </>)
}

ScheduledTransactions.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    scheduled: PropTypes.array,
  }),
}

function LastestTransactions({ transactions, category, isLoadingTransactions}) {
  const dispatch = useDispatch()
  const history = useHistory()

  return (<>
    <Title tag="h2" title="Lastest transactions" />

    {isLoadingTransactions && <Loading style={{ marginTop: '64px' }} />}

    <ol className="categories-index-page__spending-list mt-s">
      {transactions.map(transaction => {
        const value = transaction.amount * (transaction.displayData.recipient === category.name ? 1 : -1)

        return (<li key={transaction.createdAt}>
          <button
            className="categories-index-page__spending-item"
            onClick={() => dispatch(contextAssign({
              // eslint-disable-next-line react/prop-types
              header({ closeMenu }) { return <>
                <Icon
                  size="l"
                  className="categories-index-page__spending-icon"
                  {...iconType(transaction)}
                />

                <div>
                  {transaction.displayData.transactionNature}
                </div>

                <div className="categories-index-page__spending-context-title">
                  <div className="categories-index-page__spending-context-title-a">{transaction.displayData.sender}</div>

                  <Icon name="angle-double-right" />

                  <div className="categories-index-page__spending-context-title-b">{transaction.displayData.recipient}</div>
                </div>

                <MoneyDisplay
                  size="xs"
                  value={value}
                />

                <div>
                  {getDateString(transaction.createdAt)}
                </div>

                {((transaction.displayData.tags || []).length > 0) && (
                  <div className="categories-index-page__spending-context-tag-list">
                    {transaction.displayData.tags.map(tag => (
                      <Button key={tag} size="small" onClick={() => { history.push(`/tag/${tag}`); closeMenu() }}>
                        {tag}
                      </Button>
                    ))}
                  </div>
                )}

                <div />{/* separator */}
              </> },
              optionList: [
                {
                  label: 'Edit Nature',
                  onClick: () => editTransactionNature(transaction),
                },
                {
                  label: 'Edit Tags',
                  onClick: () => editTransactionTags(transaction),
                },
              ],
            }))}
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
              value={value}
            />

            <span className="categories-index-page__spending-desc">
              {transaction.displayData.transactionNature}
            </span>

            <span className="categories-index-page__spending-created-at">
              {getDateString(transaction.createdAt)}
            </span>
          </button>
        </li>)
      })}
    </ol>
  </>)
}

LastestTransactions.propTypes = {
  isLoadingTransactions: PropTypes.bool,
  category: PropTypes.shape({ name: PropTypes.string }),
  transactions: PropTypes.array,
}

export default CategoriesIndexPage
