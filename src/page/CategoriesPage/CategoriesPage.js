import './CategoriesPage.css'
import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useHistory } from 'react-router-dom'
import Title from '../../ui/Title'

function CategoriesPage() {
  const history = useHistory()

  return (
    <TopNavigationLayout onBackPress={history.goBack}>
      <Title title="Category name" />

      <Route path="/categories/new">
        <CategoriesNewPage />
      </Route>
    </TopNavigationLayout>
  )
}

export default CategoriesPage
