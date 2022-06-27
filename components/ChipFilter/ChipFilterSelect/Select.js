import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import CheckIcon from '@material-ui/icons/Check'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import cx from 'clsx'
import RadioGroup from '../../RadioGroup/RadioGroup'
import ListItem from '../../ListItem/ListItem'

/*
 * A select menu
 *
 * Children here should be an array of nferx <ListItem>'s
 * */

const styles = (theme) => ({
  icon: {
    color: theme.palette.primary.main,
    display: 'block',
  },
  spacer: {
    width: 21,
    height: 21,
  },
  border: {
    borderRadius: theme.borderRadius,
    border: [theme.border, '!important'],
  },
  checkBox: {
    padding: 0,
  },
})

const ALL = '__ALL__'

function isSelected(value, id, supportsAll) {
  if (Array.isArray(value)) {
    if (value.length === 0 && supportsAll) {
      return true
    }
    return Boolean(value.find((v) => v === id))
  }
  return value === id
}

class Select extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    onChange: PropTypes.func.isRequired,
    border: PropTypes.bool,
    supportsAll: PropTypes.bool,
    isMultiSelect: PropTypes.bool,
  }

  createChildOnClick = (childId, onClick) => {
    return (e) => {
      const { value, onChange, supportsAll } = this.props
      e.stopPropagation()

      if (onClick) {
        return onClick(e)
      }

      if (Array.isArray(value)) {
        const selected = isSelected(value, childId)

        if (selected) {
          onChange(_.without(value, childId))
        } else {
          return onChange([...value, childId])
        }
      } else {
        onChange(childId)
      }
    }
  }

  get transformedChildren() {
    const {
      children,
      value,
      classes,
      supportsAll,
      locked,
      isMultiSelect = Array.isArray(value),
    } = this.props
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: this.createChildOnClick(child.props.id, child.props.onClick),
        left: isMultiSelect ? (
          <Checkbox
            className={classes.checkBox}
            classes={{ root: classes.checkBoxRoot }}
            checked={isSelected(value, child.props.id, supportsAll)}
            color="primary"
          />
        ) : (
          <RadioGroup onChange={() => {}}>
            <Radio
              className={classes.checkBox}
              checked={isSelected(value, child.props.id, supportsAll)}
              color="primary"
            />
          </RadioGroup>
        ),
      })
    })
  }

  get allRow() {
    const { value, classes, supportsAll } = this.props

    if (!supportsAll) {
      return null
    }

    return (
      <ListItem
        onClick={() => this.props.onChange([])}
        text={'All'}
        left={
          _.isEqual(value, []) ? (
            <CheckIcon className={classes.icon} />
          ) : (
            <div className={classes.spacer} />
          )
        }
      />
    )
  }

  render() {
    const { classes, className, border } = this.props
    return (
      <List className={cx(className, { [classes.border]: Boolean(border) })}>
        {this.allRow}
        {this.transformedChildren}
      </List>
    )
  }
}

export default withStyles(styles)(Select)
