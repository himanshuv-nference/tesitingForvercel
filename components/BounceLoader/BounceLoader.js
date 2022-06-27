import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// adapted from BounceLoader in react-spinners npm package

const getCircleStyles = (theme, i) => ({
  position: 'absolute',
  borderRadius: '100%',
  opacity: 0.6,
  top: 0,
  left: 0,
  animationFillMode: 'both',
  animation: `$bounce-loader-bounce 2.1s ${
    i === 1 ? '1s' : '0s'
  } infinite ease-in-out`,
})

const styles = theme => ({
  '@keyframes bounce-loader-bounce': {
    '0%, 100%': { transform: 'scale(0)' },
    '50%': { transform: 'scale(1.0)' },
  },

  circle1: getCircleStyles(theme, 1),
  circle2: getCircleStyles(theme, 2),
  caption: {
    position: 'absolute',
    left: '50%',
    top: '100%',
    marginTop: theme.pad.xxs,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  },
})

class Loader extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    sizeUnit: PropTypes.string,
    message: PropTypes.string,
  }

  static defaultProps = {
    loading: true,
    size: 60,
    sizeUnit: 'px',
    message: '',
  }

  render() {
    const {
      loading,
      size,
      sizeUnit,
      color,
      theme,
      classes,
      message,
    } = this.props

    if (!loading) return null

    const diameter = size + sizeUnit
    const dimension = {
      width: diameter,
      height: diameter,
    }

    return (
      <div
        style={{
          position: 'relative',
          ...dimension,
        }}
      >
        <div
          className={classes.circle1}
          style={{
            ...dimension,
            backgroundColor: color || theme.palette.primary.main,
          }}
        />
        <div
          className={classes.circle2}
          style={{
            ...dimension,
            backgroundColor: color || theme.palette.primary.main,
          }}
        />
        {!!message && (
          <Typography variant="caption" className={classes.caption}>
            {message}
          </Typography>
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Loader)
