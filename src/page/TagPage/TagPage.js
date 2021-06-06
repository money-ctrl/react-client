import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import Card from '../../ui/Card'
import Loading from '../../ui/Loading'
import { getAllTransactionsByTag } from '../../services/backend'
import MoneyDisplay from '../../components/MoneyDisplay'

const StatMoneyDisplay = (rest) => {
  return (
    <MoneyDisplay
      size="s"
      orientation="horizontal"
      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      monochromatic={true}
      {...rest}
    />
  )
}

function TagPage() {
  const { tag } = useParams()
  const history = useHistory()

  const [transactionList, setTransactionList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const total = transactionList.reduce((acc, cur) => {
    return acc + cur.amount
  }, 0)

  useEffect(() => {
    (async () => {
      setTransactionList(await getAllTransactionsByTag(tag))
      setIsLoading(false)
    })()
  }, [])

  return (<TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title={tag} />

    <Title tag="h2" title="Stats" className="mb-m" />
    <StatMoneyDisplay
      label="Total spent"
      value={total}
    />

    <Title tag="h2" title="Transactions" className="my-m" />
    {(isLoading) ? <Loading /> : transactionList.map(transaction => (
      <Card key={transaction.id} className="p-m my-s">
        {transaction.displayData.transactionNature}
      </Card>
    ))}
  </TopNavigationLayout>)
}

export default TagPage
