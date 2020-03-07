import React from 'react'
import { Route } from 'react-router-dom'
import CategoriesNewPage from './CategoriesNewPage'

function CategoriesPage() {
  return (
    <div>
      <p>
        cara, essa página não ta feita inda, sorry :(
      </p>

      <Route path="/categories/new">
        <CategoriesNewPage />
      </Route>
    </div>
  )
}

export default CategoriesPage
