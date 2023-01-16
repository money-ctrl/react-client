import './CategoriesPage.css'
import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'
import CategoriesIndexPage from './CategoriesIndexPage'

function CategoriesPage() {
  return (<>
    <Route path="/categories/new">
      <CategoriesNewPage />
    </Route>

    <Route path="/categories/:categoryId">
      <CategoriesIndexPage />
    </Route>
  </>)
}

export default CategoriesPage
