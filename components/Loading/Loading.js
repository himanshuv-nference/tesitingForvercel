import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BounceLoader from '../BounceLoader/BounceLoader'
import cx from 'clsx'

/*
 * A bubbly loading indicator
 * */

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  bubbleLoaderContainer: {
    margin: 'auto',
  },
})

class Loading extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    height: 250,
  }

  render() {
    const { classes, height, style, className, ...rest } = this.props

    return (
      <div className={cx(classes.root, className)} style={{ height, ...style }}>
        <div className={classes.bubbleLoaderContainer}>
          <BounceLoader {...rest} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Loading)
