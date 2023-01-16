import React from 'react'
import PropTypes from 'prop-types'
import Form from '@/ui/Form'
import Label from '@/ui/Label'
import { Input, Select } from '@/ui/Input'
import Button from '@/ui/Button'
import { trim, mapValues, mapKeyedTransform } from '@/utils'

function TransactionForm({ nextStep }) {
  return (
    <Form
      onSubmit={({ data }) => {
        const values = mapKeyedTransform(mapValues(data, trim), {
          repeatCount: (value) => {
            const number = Number(value)

            if (!number || number < 1) {
              return Infinity
            } else {
              return value
            }
          },
        })

        nextStep(values)
      }}
    >
      <Label
        label="Times it will be scheduled"
        hint="leave blank to never stop scheduling automatically"
        name="repeatCount"
        className="mt-m"
      >
        {attrs => (
          <Input
            autoComplete="off"
            type="number"
            {...attrs}
            placeholder="Infinity"
          />
        )}
      </Label>

      <Label
        label="When the schedule will be committed"
        name="triggerType"
        className="mt-m"
      >
        {attrs => (
          <Select
            autoComplete="off"
            defaultValue="manual"
            options={[
              ['manual', 'Manual'],
              ['onCycleReset', 'When Cycle Begins'],
            ]}
            {...attrs}
          />
        )}
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
