import React from 'react'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'
import { useHistory } from 'react-router-dom'

function SchedulesPage() {
  const history = useHistory()

  return <TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title="Schedules" />

    hey, that&apos;s when I began to pray
  </TopNavigationLayout>
}

export default SchedulesPage
