import './CategoriesPage.css'
import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'
import CategoriesIndexPage from './CategoriesIndexPage'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useHistory } from 'react-router-dom'

function CategoriesPage() {
  const history = useHistory()

  return (
    <TopNavigationLayout onBackPress={history.goBack}>
      <Route path="/categories/:categoryId">
        <CategoriesIndexPage />
      </Route>

      <Route path="/categories/new">
        <CategoriesNewPage />
      </Route>
    </TopNavigationLayout>
  )
}

export default CategoriesPage
