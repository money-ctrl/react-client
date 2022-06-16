import React from 'react'
import PropTypes from 'prop-types'
import Form from '@/ui/Form'
import Label from '@/ui/Label'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import { trim, mapValues } from '@/utils'

function TransactionForm({ nextStep }) {
  return (
    <Form
      onSubmit={({ data }) => {
        const { nature, tags } = mapValues(data, trim)

        nextStep({
          transactionNature: nature,
          tags: (tags === '') ? [] : tags.split(','),
        })
      }}
    >
      <Label
        label="Transaction Nature"
        name="nature"
        className="mt-m"
      >
        {attrs => (<Input autoComplete="off" {...attrs} />)}
      </Label>

      <Label
        label="Tags (comma separated)"
        name="tags"
        className="mt-m"
      >
        {attrs => (<Input autoComplete="off" {...attrs} />)}
      </Label>

      <Button
        className="mt-m"
        variant="primary"
      >
        Next
      </Button>
    </Form>
  )
}

TransactionForm.propTypes = {
  nextStep: PropTypes.func,
}

export default TransactionForm
