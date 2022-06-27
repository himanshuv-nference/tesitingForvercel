import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import MuiRadio from '@material-ui/core/Radio'
import { FormControlLabel, Typography as T } from '@material-ui/core'

const useStyles = makeStyles(theme => ({}))

function Radio(props) {
  const { value, id, onChange, label, helperText, ...rest } = props
  const classes = useStyles(props)

  const radio = (
    <MuiRadio
      value={id}
      //checked={value}
      onChange={(e, value) => onChange && onChange(value, e)}
      {...rest}
    />
  )

  if (label) {
    return (
      <FormControlLabel
        control={radio}
        label={
          <>
            {label}
            {helperText && <T variant={'caption'}>{helperText}</T>}
          </>
        }
        labelPlacement="end"
      />
    )
  }

  return radio
}

Radio.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary']),
  label: PropTypes.node,
  helperText: PropTypes.node,
}

Radio.defaultProps = {
  color: 'primary',
}

export default Radio
