import './CategorySelector.css'
import React from 'react'
import PropTypes from 'prop-types'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useSelector } from 'react-redux'
import CircularProgress from '../../ui/CircularProgress'
import Button from '../../ui/Button'

function CategorySelector({
  onBackPress = () => {},
  onSubmit = () => {},
}) {
  const categorylist = useSelector(state => state.categories.list)

  return (
    <TopNavigationLayout
      onBackPress={onBackPress}
      titleSlot={''}
      className="category-selector"
    >
      {categorylist.map((category) => (
        <div key={category.id} className="category-selector__item">
          <CircularProgress value={category.amount} max={category.limit} inverted={true} />

          <Button onClick={() => onSubmit(category)}>
            {category.name}
          </Button>
        </div>
      ))}
    </TopNavigationLayout>
  )
}

CategorySelector.propTypes = {
  onBackPress: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default CategorySelector
