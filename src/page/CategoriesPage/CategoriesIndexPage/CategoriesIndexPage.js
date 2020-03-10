import React from 'react'
import Title from '../../../ui/Title'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../ui/Loading'

function CategoriesPageNew() {
  const { categoryId } = useParams()
  const category = useSelector(state => state.categories.ids[categoryId])

  if (!category) return <Loading/>

  return (<>
    <Title title={category.name} />

    <div>
      current
    </div>
  </>)
}

export default CategoriesPageNew
