import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PaginationForwardIcon from './PaginationForwardIcon'
import PaginationBackwardIcon from './PaginationBackwardIcon'
import PaginationBeginningIcon from './PaginationBeginningIcon'
import PaginationEndingIcon from './PaginationEndingIcon'
import useStyles from './styles'
import cx from 'clsx'
import { numberWithCommas } from '../../utils/numberWithCommas'

const VARIANT_LIGHT = 'light',
  VARIANT_DARK = 'dark',
  FIRST_PAGE = 1

function Pagination(props) {
  const {
    value: _value,
    pageSize,
    totalCount,
    onChange,
    className,
    style,
    disableHelperText,
    variant,
  } = props

  const value = Number(_value)

  const classes = useStyles()
  const totalPages = Math.ceil(totalCount / pageSize)
  const isFirstPage = value === FIRST_PAGE
  const isLastPage = value === totalPages
  const lastCount = isLastPage ? totalCount : value * pageSize

  const [inputValue, setInputValue] = React.useState(value)

  if (typeof totalCount !== 'number') {
    throw new Error('Must pass totalCount')
  }

  function handleGoToPage(page) {
    if (page > totalPages) {
      onChange(totalPages)
    } else if (page < FIRST_PAGE) {
      onChange(FIRST_PAGE)
    } else {
      onChange(page)
    }
  }

  function handleGoToFirstPage() {
    return handleGoToPage(FIRST_PAGE)
  }

  function handleGoToLastPage() {
    return handleGoToPage(totalPages)
  }

  function handleGoToPrevPage() {
    return handleGoToPage(value - 1)
  }

  function handleGoToNextPage() {
    return handleGoToPage(value + 1)
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const num = Number(inputValue)
      if (!isNaN(num)) {
        handleGoToPage(Math.floor(num))
      }
    }
  }

  function handleBlur() {
    const num = Number(inputValue)
    if (!isNaN(num)) {
      handleGoToPage(Math.floor(num))
    } else {
      setInputValue(value)
    }
  }

  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <>
      <div
        style={style}
        className={cx(classes.root, className, {
          [classes.dark]: variant === VARIANT_DARK,
        })}
      >
        <IconButton
          onClick={handleGoToFirstPage}
          className={classes.iconButtonWrapper}
          disabled={isFirstPage}
        >
          <PaginationBeginningIcon />
        </IconButton>
        <IconButton
          onClick={handleGoToPrevPage}
          className={classes.iconButtonWrapper}
          disabled={isFirstPage}
        >
          <PaginationBackwardIcon />
        </IconButton>
        <div className={classes.text}>
          <input
            className={classes.input}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <Typography variant={'body2'}>
            of {numberWithCommas(totalPages)}
          </Typography>
        </div>
        <IconButton
          onClick={handleGoToNextPage}
          className={classes.iconButtonWrapper}
          disabled={isLastPage}
        >
          <PaginationForwardIcon />
        </IconButton>
        <IconButton
          onClick={handleGoToLastPage}
          className={classes.iconButtonWrapper}
          disabled={isLastPage}
        >
          <PaginationEndingIcon />
        </IconButton>
      </div>
      {/* {disableHelperText ? null : (
        <div className={classes.helperText}>
          <Typography variant={'body3'}>{`${numberWithCommas(
            (value - 1) * pageSize + 1,
          )} - ${numberWithCommas(lastCount)} of ${numberWithCommas(
            totalCount,
          )}`}</Typography>
        </div>
      )} */}
    </>
  )
}

export default Pagination

Pagination.propTypes = {
  value: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disableHelperText: PropTypes.bool,
  variant: PropTypes.oneOf([VARIANT_LIGHT, VARIANT_DARK]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

Pagination.defaultProps = {
  value: FIRST_PAGE,
  pageSize: 10,
  disableHelperText: false,
  variant: VARIANT_LIGHT,
}
