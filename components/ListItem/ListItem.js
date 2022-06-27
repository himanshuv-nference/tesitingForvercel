import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MaterialListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import cx from 'clsx'

/*
 * An Nferx styled list item
 * Can display a line of text with a subtitle
 * as well as left and/or right positioned elements
 * wraps MUI's list item so can pass props through to that as well
 *
 * everything except text is optional
 * */

const styles = (theme) => ({
  root: {
    alignItems: 'flex-start',
    padding: [0, theme.pad.sm],
    margin: 0,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  rootHasHoverRight: {
    '&:hover $rightContainer': {
      display: 'none',
    },
    '&:hover $hoverRight': {
      display: 'block',
    },
  },
  selected: {
    backgroundColor: theme.palette.background.highlight,
  },
  leftContainer: {
    flexGrow: 0,
    flexShrink: 0,
    margin: ['auto', theme.pad.sm, 'auto', 0],

    '& svg': {
      display: 'block',
    },
  },
  rightContainer: {
    flexGrow: 0,
    flexShrink: 0,
    margin: ['auto', 0, 'auto', theme.pad.xs],

    '& svg': {
      display: 'block',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: ['auto', 0],
    padding: [theme.pad.xs, 0],
    flex: 1,
    overflow: 'hidden',
  },
  subText: {
    fontSize: theme.typography.fontSizeSm,
    ...theme.overflowEllipsis,
  },
  text: {
    margin: ['auto', 0],
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    lineHeight: 1.4,
    fontSize: theme.typography.fontSize,

    ...theme.overflowEllipsis,
  },
  hoverRight: {
    display: 'none',
  },
  wrap: {
    whiteSpace: 'normal',
  },
})

class ListItem extends Component {
  static propTypes = {
    /**
     * The main section of the list item. Although you will generally pass a string, you can pass any react node including a div or component
     */
    text: PropTypes.node,
    /**
     * Subtitle style text that is rendered below 'text'
     */
    subText: PropTypes.node,
    /**
     * A node that is rendered to the left of text/subText
     */
    left: PropTypes.node,
    /**
     * A node that is rendered to the far right of the ListItem
     */
    right: PropTypes.node,
    /**
     * A css className that is assigned to the root node of the ListItem
     */
    className: PropTypes.string,
    /**
     * A callback function that is called anytime the user clicks on the ListItem
     */
    onClick: PropTypes.func,
    /**
     * If true, the ListItem becomes highlighted, indicating to the user that it's selected in some way.
     */
    isSelected: PropTypes.bool,
    /**
     * If true, 'text' is allowed to wrap to multiple lines
     */
    textWrap: PropTypes.bool,
    /**
     *
     **/
    textMaxLines: PropTypes.number,
    /**
     * Similar to 'right', except it will only be rendered if the user is hovering the ListItem.
     */
    hoverRight: PropTypes.node,
  }

  static defaultProps = {
    textWrap: false,
  }

  render() {
    const {
      classes,
      text,
      subText,
      left,
      right,
      onClick,
      isSelected,
      className,
      textWrap,
      textMaxLines,
      theme,
      hoverRight,
      ...rest
    } = this.props

    return (
      <MaterialListItem
        className={cx(className, classes.li, classes.root, {
          [classes.selected]: isSelected,
          [classes.rootHasHoverRight]: Boolean(hoverRight),
        })}
        onClick={onClick}
        button={Boolean(onClick)}
        {...rest}
      >
        {left && <div className={classes.leftContainer}>{left}</div>}
        <div className={classes.textContainer}>
          {text && (
            <Typography
              component="span"
              variant={'body2'}
              className={cx(className, classes.text, {
                [classes.wrap]: textWrap,
              })}
              {...rest}
            >
              {text}
            </Typography>
          )}
          {subText && (
            <Typography
              variant={'caption'}
              align={'left'}
              className={classes.subText}
            >
              {subText}
            </Typography>
          )}
        </div>
        {right && <div className={classes.rightContainer}>{right}</div>}
        {hoverRight && (
          <div className={cx(classes.hoverRight, classes.rightContainer)}>
            {hoverRight}
          </div>
        )}
      </MaterialListItem>
    )
  }
}

export default withStyles(styles)(ListItem)
