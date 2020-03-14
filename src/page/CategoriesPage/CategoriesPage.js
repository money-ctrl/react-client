import './CategoriesPage.css'
import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'
import CategoriesIndexPage from './CategoriesIndexPage'

function CategoriesPage() {
  return (<>
    <Route path="/categories/:categoryId">
      <CategoriesIndexPage />
    </Route>

    <Route path="/categories/new">
      <CategoriesNewPage />
    </Route>
  </>)
}

export default CategoriesPage
