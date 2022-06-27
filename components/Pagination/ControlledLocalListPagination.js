import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Pagination from './Pagination'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  pad: {
    padding: theme.pad.xs,
  },
}))

function ControlledLocalListPagination(props) {
  const {
    data,
    value,
    onChange,
    children,
    pageSize,
    disableHelperText,
    className,
  } = props
  const classes = useStyles(props)

  const start = (value - 1) * pageSize
  const end = value * pageSize
  const slicedData = useMemo(() => data.slice(start, end), [data, start, end])

  return (
    <div className={className}>
      {children(slicedData)}
      <Divider />
      <div className={classes.pad}>
        <Pagination
          value={value}
          onChange={onChange}
          totalCount={data.length}
          pageSize={pageSize}
          disableHelperText={disableHelperText}
        />
      </div>
    </div>
  )
}

ControlledLocalListPagination.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  children: PropTypes.func.isRequired,
  disableHelperText: PropTypes.bool,
  className: PropTypes.string,
}

ControlledLocalListPagination.defaultProps = {
  pageSize: 10,
}

export default ControlledLocalListPagination
