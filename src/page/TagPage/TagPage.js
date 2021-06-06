import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import Title from '../../ui/Title'

function TagPage() {
  const { tag } = useParams()
  const history = useHistory()

  return (<TopNavigationLayout onBackPress={history.goBack}>
    <Title tag="h1" title={tag} />
  </TopNavigationLayout>)
}

export default TagPage
