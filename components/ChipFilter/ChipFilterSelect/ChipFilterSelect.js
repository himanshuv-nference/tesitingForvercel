import { makeStyles } from '@material-ui/styles'
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import HighlightText from '../../HighlightText/HighlightText'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ChipFilter from '../ChipFilter'
import Select from './Select'

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
  },
  pr8: {
    paddingRight: '8px',
  },
  subtitle: {
    backgroundColor: theme.palette.background.default,
    padding: [theme.pad.xs, theme.pad.sm],
    display: 'flex',
    justifyContent: 'space-between',
  },
  textButton: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

function ChipFilterSelect(props) {
  const {
    isDefault,
    label: pLabel,
    onDelete,
    onChange,
    value,
    allValues,
    searchPlaceholder,
    selectPlaceholder,
    supportsAll,
    children,
    showMultiSelectCount = true,
    locked,
    disabled,
    closeOnChange,
    ...rest
  } = props
  const classes = useStyles(props)
  const [search, setSearch] = React.useState('')
  const searchRegex = new RegExp(`${_.escapeRegExp(search)}`, 'i')

  const isMultiSelect = Array.isArray(value)
  const childArray = React.Children.toArray(children)

  let label = pLabel
  if (!isDefault) {
    if (isMultiSelect && showMultiSelectCount) {
      label = `${pLabel} • ${value.length}`
    } else {
      const match = childArray.find((c) => c.props.id === value)
      if (match) {
        label = match.props.text
      }
    }
  }

  const filteredChildren = !search
    ? children
    : childArray
        .filter((c) => searchRegex.test(c.props.text))
        .map((c) => {
          return React.cloneElement(c, {
            text: (
              <HighlightText match={search} matchType={'substring'}>
                {c.props.text}
              </HighlightText>
            ),
          })
        })

  return (
    <ChipFilter
      label={label}
      onDelete={onDelete}
      isDefault={isDefault}
      value={value}
      closeOnChange={isMultiSelect ? false : closeOnChange}
      disabled={disabled}
      subtitle={
        <TextField
          value={search}
          onChange={setSearch}
          placeholder={searchPlaceholder}
          size={'small'}
          classes={{}}
          autoFocus
          fullWidth
        />
      }
      onClose={() => setSearch('')}
      {...rest}
    >
      <div className={classes.subtitle}>
        <Typography variant={'caption'}>
          {selectPlaceholder}
          {Array.isArray(value) && `(s)`}
        </Typography>
        {isMultiSelect && (
          <div className={classes.flex}>
            {allValues && (
              <Typography
                className={cx(classes.textButton, classes.pr8)}
                variant={'body2'}
                onClick={() => onChange(allValues)}
              >
                Select all
              </Typography>
            )}
            <Typography
              className={classes.textButton}
              variant={'body2'}
              onClick={() => onChange([])}
            >
              Clear
            </Typography>
          </div>
        )}
      </div>
      {filteredChildren.length === 0 && (
        <Typography variant={'caption'} pad>
          No Results
        </Typography>
      )}
      <Select
        value={value}
        onChange={onChange}
        supportsAll={supportsAll}
        locked={locked}
        isMultiSelect={isMultiSelect}
      >
        {filteredChildren}
      </Select>
    </ChipFilter>
  )
}

ChipFilterSelect.propTypes = {
  ...ChipFilter.PropTypes,
  showMultiSelectCount: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
  allValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  ),
  searchPlaceholder: PropTypes.string,
  selectPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  closeOnChange: PropTypes.bool,
}

ChipFilterSelect.defaultProps = {
  searchPlaceholder: 'Search for an option',
  selectPlaceholder: 'Select an Option',
  disabled: false,
  closeOnChange: true,
}

export default ChipFilterSelect
