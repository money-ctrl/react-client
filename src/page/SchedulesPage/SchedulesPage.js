import './SchedulesPage.css'
import React, { Fragment } from 'react'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../../ui/Card'
import { flat } from '../../utils'

function SchedulesPage() {
  const history = useHistory()
  const scheduleList = useSelector(state => state.schedules.list)

  return <TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title="Schedules" />

    {scheduleList.map(schedule => (
      <Card key={schedule.id} className="p-m mb-s w-100">
        <dl>
          {Object.entries(flat(schedule)).map(([key, value]) => (
            <Fragment key={key}>
              <dt className="schedules-page__list-title">{key}</dt>
              <dd className="schedules-page__list-description">{JSON.stringify(value)}</dd>
            </Fragment>
          ))}
        </dl>
      </Card>
    ))}
  </TopNavigationLayout>
}

export default SchedulesPage
