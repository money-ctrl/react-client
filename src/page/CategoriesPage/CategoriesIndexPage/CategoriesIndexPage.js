import './CategoriesIndexPage.css'
import React from 'react'
import Title from '../../../ui/Title'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../ui/Loading'
import Card from '../../../ui/Card'
import MoneyDisplay from '../../../components/MoneyDisplay'
import Overdrive from 'react-overdrive'

function CategoriesIndexPage() {
  const { categoryId } = useParams()
  const category = useSelector(state => state.categories.ids[categoryId])

  if (!category) return <Loading/>

  return (<>
    <Title title={category.name} />

    <Overdrive id={`category-card-${categoryId}`}>
      <Card className="categories-index-page__card">
        <MoneyDisplay
          value={category.amount}
        />

        <div className="categories-index-page__slash">/</div>

        <MoneyDisplay
          value={category.limit}
          size={.5}
        />
      </Card>
    </Overdrive>

    <div>
      current
    </div>
  </>)
}

export default CategoriesIndexPage
