import './CategorySelector.css'
import React from 'react'
import PropTypes from 'prop-types'
import TopNavigationLayout from '../../layout/TopNavigationLayout'
import { useSelector } from 'react-redux'
import CircularProgress from '../../ui/CircularProgress'
import Button from '../../ui/Button'
import Title from '../../ui/Title'
import { resourceId } from '../../utils'
import MoneyDisplay from '../MoneyDisplay'
import { categoryPresenter } from '../../services/category'

function CategorySelector({
  onBackPress = () => {},
  onSubmit = () => {},
  blacklist = [],
  title,
}) {
  const categorylist = useSelector(state => state.categories.list)
    .filter(category => !blacklist.includes(resourceId(category)))
    .map(categoryPresenter)

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
          <CircularProgress
            value={category.amountWithDeductions}
            max={category.allocated}
            className="category-selector__item-progress"
          />

          <Button onClick={() => onSubmit(category)} className="category-selector__item-submit">
            {category.name}
          </Button>

          <div className="category-selector__item-money">
            <MoneyDisplay
              value={category.amountWithDeductions}
              size="xxs"
              behavior="inline"
            /> / <MoneyDisplay
              value={category.allocated}
              size="xxs"
              behavior="inline"
            />
          </div>
        </div>
      ))}
    </TopNavigationLayout>
  )
}

CategorySelector.propTypes = {
  onBackPress: PropTypes.func,
  onSubmit: PropTypes.func,
  blacklist: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default CategorySelector
