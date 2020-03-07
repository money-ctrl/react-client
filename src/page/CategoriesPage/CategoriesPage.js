import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useHistory } from 'react-router-dom'

function CategoriesPage() {
  const history = useHistory()

  return (
    <TopNavigationLayout onBackPress={history.goBack}>
      <p>
        cara, essa página não ta feita inda, sorry :(
      </p>

      <Route path="/categories/new">
        <CategoriesNewPage />
      </Route>
    </TopNavigationLayout>
  )
}

export default CategoriesPage
