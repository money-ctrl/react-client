import React from 'react'
import PropTypes from 'prop-types'
import Form from '@/ui/Form'
import Label from '@/ui/Label'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import { trim, mapValues } from '@/utils'

function TransactionForm({ nextStep, previousStep }) {
  return (
    <Form
      onSubmit={({ data }) => {
        const { nature, tags } = mapValues(data, trim)

        nextStep({
          transactionNature: nature || 'Nature not specified',
          tags: (tags === '') ? [] : tags.split(','),
        })
      }}
    >
      <Label
        label="Transaction Nature"
        name="nature"
        className="mt-m"
      >
        {attrs => (
          <Input
            autoComplete="off"
            {...attrs}
            placeholder="Nature not specified"
          />
        )}
      </Label>

      <Label
        label="Tags (comma separated)"
        name="tags"
        className="mt-m"
      >
        {attrs => (
          <Input
            autoComplete="off"
            {...attrs}
            placeholder="Ex.: home,fixed"
          />
        )}
      </Label>

      <div className="d-flex space-between reverse">
        <Button
          className="mt-m"
          variant="primary"
        >
          Next
        </Button>

        <Button
          className="mt-m"
          variant="default"
          onClick={previousStep}
        >
          Back
        </Button>
      </div>
    </Form>
  )
}

TransactionForm.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
}

export default TransactionForm
