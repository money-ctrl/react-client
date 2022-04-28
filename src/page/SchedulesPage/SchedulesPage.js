import './SchedulesPage.css'
import React from 'react'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../../ui/Card'
import MoneyDisplay from '../../components/MoneyDisplay'
import { resourceId } from '../../utils'

function SchedulesPage() {
  const history = useHistory()
  const scheduleList = useSelector(state => state.schedules.list)

  const separatedPerCategory = Object.values(scheduleList.reduce((separated, item) => {
    const categoryKey = resourceId(item.transactionPayload.sender)

    if (!separated[categoryKey]) {
      separated[categoryKey] = {
        displayName: item.transactionPayload.sender.name,
        categorySchedules: [],
      }
    }

    separated[categoryKey].categorySchedules.push(item)

    return separated
  }, {}))

  return <TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title="Schedules" />

    {separatedPerCategory.length
      ? separatedPerCategory.map(({ displayName, categorySchedules }) => (<>
        <Title tag="h2" title={displayName} className="mb-s mt-l" />

        {categorySchedules.map(schedule => (
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
              <dd className="schedules-page__list-description">{schedule.repeatCount}/{schedule.repeatCountTotal}</dd>

              <dt className="schedules-page__list-title">triggerType:</dt>
              <dd className="schedules-page__list-description">{JSON.stringify(schedule.triggerType)}</dd>

              <dt className="schedules-page__list-title">raw:</dt>
              <dd className="schedules-page__list-description">{JSON.stringify(schedule)}</dd>
            </dl>
          </Card>
        ))}
      </>))
      : (
        <Card className="p-m">
          <p>No schedules found, try creating some.</p>
        </Card>
      )}
  </TopNavigationLayout>
}

export default SchedulesPage
