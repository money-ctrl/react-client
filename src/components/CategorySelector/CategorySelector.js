import './CategorySelector.css'
import React from 'react'
import PropTypes from 'prop-types'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useSelector } from 'react-redux'
import CircularProgress from '../../ui/CircularProgress'
import Button from '../../ui/Button'
import Title from '../../ui/Title'

function CategorySelector({
  onBackPress = () => {},
  onSubmit = () => {},
  title,
}) {
  const categorylist = useSelector(state => state.categories.list)

  return (
    <TopNavigationLayout
      className="category-selector"
      onBackPress={onBackPress}
      titleSlot={title && (
        <Title tag="strong" color="dark" className="category-selector__title">
          {title}
        </Title>
      )}
    >
      {categorylist.map((category) => (
        <div key={category.id} className="category-selector__item">
          <CircularProgress value={category.amount} max={category.allocated} />

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
  title: PropTypes.string,
}

export default CategorySelector
