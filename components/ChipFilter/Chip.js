import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import DeleteIcon from '@material-ui/icons/Close'
import cx from 'clsx'

const styles = theme => ({
  chipRootDefault: {
    backgroundColor: 'transparent',
    border: theme.border,
  },

  chipLabelDark: {
    color: theme.typography.color,
    fontWeight: 'normal',
    fontSize: theme.typography.fontSize,
    paddingRight: 16,
    paddingLeft: 12,
    lineHeight: '32px',
  },
  chipDeleteIconDark: {
    color: theme.typography.color,
    width: 18,
    height: 18,
    margin: [2, 8, 0, -6],

    '&:hover': {
      color: theme.typography.color,
    },
  },
  chipClickableDark: {
    '&:hover': {
      backgroundColor: theme.palette.background.dark,
    },
  },
  chipDeletableDark: {
    '&:focus': {
      backgroundColor: theme.palette.background.highlight,
    },
  },

  chipClickableNonDefaultDark: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.background.highlight,
    },
  },

  chipLabelLight: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'normal',
    fontSize: theme.typography.fontSize,
    paddingRight: 16,
    paddingLeft: 12,
    lineHeight: '32px',
  },
  chipDeleteIconLight: {
    color: theme.palette.primary.contrastText,
    width: 18,
    height: 18,
    margin: [2, 8, 0, -6],

    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  chipClickableLight: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  chipDeletableLight: {
    '&:focus': {
      backgroundColor: theme.palette.primary.medium,
    },
  },

  chipClickableNonDefault: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.medium,
    },
  },
  chipLabelNoLabel: {
    display: 'none',
  },
  chipDeleteIconNoLabel: {
    margin: [0, theme.pad.xxs],
  },
})

class NferxChip extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['light', 'dark']),
    label: PropTypes.string,
    isDefault: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    variant: 'dark',
    defaultIcon: <ArrowDropDown />,
  }

  render() {
    const {
      label,
      onDelete,
      isDefault,
      classes,
      onClick,
      variant,
      defaultIcon,
      ...rest
    } = this.props

    const isLight = variant === 'light'
    const isDark = variant === 'dark'

    const chipClasses = {
      root: classes.chipRootDefault,
    }

    if (isLight) {
      chipClasses.label = classes.chipLabelLight
      chipClasses.deleteIcon = classes.chipDeleteIconLight
      chipClasses.clickable = classes.chipClickableLight
      chipClasses.deletable = classes.chipDeletableLight

      if (!isDefault) {
        chipClasses.root = cx(chipClasses.root, classes.chipClickableNonDefault)
      }
    } else if (isDark) {
      chipClasses.label = classes.chipLabelDark
      chipClasses.deleteIcon = classes.chipDeleteIconDark
      chipClasses.clickable = classes.chipClickableDark
      chipClasses.deletable = classes.chipDeletableDark

      if (!isDefault) {
        chipClasses.root = cx(
          chipClasses.root,
          classes.chipClickableNonDefaultDark,
        )
      }
    }

    if (!label) {
      chipClasses.label = classes.chipLabelNoLabel
      chipClasses.deleteIcon = cx(
        chipClasses.deleteIcon,
        classes.chipDeleteIconNoLabel,
      )
    }

    return (
      <Chip
        label={label}
        deleteIcon={isDefault ? defaultIcon : <DeleteIcon />}
        onClick={onClick}
        onDelete={isDefault ? onClick : onDelete}
        classes={chipClasses}
        {...rest}
      />
    )
  }
}

export default withStyles(styles)(NferxChip)
