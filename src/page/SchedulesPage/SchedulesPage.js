import React from 'react'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../../ui/Card'

function SchedulesPage() {
  const history = useHistory()
  const scheduleList = useSelector(state => state.schedules.list)

  return <TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title="Schedules" />

    {scheduleList.map(schedule => (
      <Card key={schedule.id} className="p-m mb-s w-100">
        {JSON.stringify(schedule, null, 2)}
      </Card>
    ))}
  </TopNavigationLayout>
}

export default SchedulesPage
