import './SchedulesPage.css'
import React from 'react'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../../ui/Card'
import MoneyDisplay from '../../components/MoneyDisplay'

function SchedulesPage() {
  const history = useHistory()
  const scheduleList = useSelector(state => state.schedules.list)

  return <TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title="Schedules" />

    {scheduleList.map(schedule => (
      <Card key={schedule.id} className="p-m mb-s w-100">
        <dl>
          <dt className="schedules-page__list-title">Nature:</dt>
          <dd className="schedules-page__list-description">
            {JSON.stringify(schedule.transactionPayload.transactionNature)}
          </dd>

          <dt className="schedules-page__list-title">Amount:</dt>
          <dd className="schedules-page__list-description">
            <MoneyDisplay value={schedule.transactionPayload.amount} size="xxs" />
          </dd>

          <dt className="schedules-page__list-title">On category:</dt>
          <dd className="schedules-page__list-description">
            {JSON.stringify(schedule.transactionPayload.sender.name)}
          </dd>

          <dt className="schedules-page__list-title">repeatCount:</dt>
          <dd className="schedules-page__list-description">{JSON.stringify(schedule.repeatCount)}</dd>

          <dt className="schedules-page__list-title">triggerType:</dt>
          <dd className="schedules-page__list-description">{JSON.stringify(schedule.triggerType)}</dd>

          <dt className="schedules-page__list-title">raw:</dt>
          <dd className="schedules-page__list-description">{JSON.stringify(schedule)}</dd>
        </dl>
      </Card>
    ))}
  </TopNavigationLayout>
}

export default SchedulesPage
