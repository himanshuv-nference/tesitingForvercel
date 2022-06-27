import React from 'react'
import PropTypes from 'prop-types'
import {
  RadioGroup as MUIRadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.pad.xxs,
    fontSize: theme.typography.fontSize,
  },
  group: {
    '& label': {
      marginRight: 0,
    },
    '& label + label': {
      marginTop: theme.pad.xs,
    },
  },
}))

function RadioGroup(props) {
  const { onChange, label, helperText, error, ...rest } = props
  const classes = useStyles(props)

  const radioGroup = (
    <MUIRadioGroup
      onChange={(e) => onChange(e.target.value, e)}
      className={classes.group}
      {...rest}
    />
  )

  if (label) {
    return (
      <FormControl error={error} component="fieldset">
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        {radioGroup}
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  return radioGroup
}

RadioGroup.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.node,
}

export default RadioGroup
