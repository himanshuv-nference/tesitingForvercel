import React from 'react'
import PropTypes from 'prop-types'
import ControlledLocalListPagination from './ControlledLocalListPagination'

function LocalListPagination(props) {
  const { value, onChange, ...rest } = props
  const [localValue, onLocalValueChange] = React.useState(1)

  if (onChange) {
    return (
      <ControlledLocalListPagination
        value={value}
        onChange={onChange}
        {...rest}
      />
    )
  }

  return (
    <ControlledLocalListPagination
      value={localValue}
      onChange={onLocalValueChange}
      {...rest}
    />
  )
}

LocalListPagination.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  valueSize: PropTypes.number,
  children: PropTypes.func.isRequired,
  disableHelperText: PropTypes.bool,
  className: PropTypes.string,
}

LocalListPagination.defaultProps = {
  valueSize: 10,
}

export default LocalListPagination
