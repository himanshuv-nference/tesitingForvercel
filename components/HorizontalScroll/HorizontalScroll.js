import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import cx from 'clsx'
import { Hidden, IconButton } from '@material-ui/core'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles(theme => {
  return {
    root: {
      overflow: 'hidden',
      position: 'relative',
      //   minHeight: 54,
    },

    scrollContainer: {
      padding: [theme.pad.xxs, 0],
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      height: '100%',
      alignItems: 'center',
      overscrollBehaviorX: 'contain',

      '& > *': {
        margin: theme.pad.xxs,
        flexShrink: 0,
      },

      '& > *:first-child': {
        marginLeft: 0,
      },

      '& > *:last-child': {
        marginRight: 0,
      },

      '&::-webkit-scrollbar-thumb': {
        display: 'none',
      },

      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    justifyCenter: {
      justifyContent: 'center',
    },

    mobileScrollIndicator: {
      position: 'absolute',
      width: 20,
      top: '-25%',
      bottom: 0,
      height: '150%',
      backgroundColor: '#FFF',
      boxShadow:
        '0px 0px 8px 4px rgba(255,255,255,1.0), -2px 0px 12px 10px rgba(255,255,255,0.7), -6px 0px 24px 10px rgba(255,255,255,0.55)',
    },
    indicatorLeft: {
      left: -20,
    },
    indicatorRight: {
      right: -20,
    },

    desktopScrollButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      boxShadow: theme.shadows[3],
      backgroundColor: '#FFFFFF',

      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    buttonLeft: {
      left: -12,
    },
    buttonRight: {
      right: -12,
    },
  }
})

function HorizontalScroll(props) {
  const { children, justifyCenter, onScrollEnd } = props
  const classes = useStyles(props)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const scrollRef = React.useRef()

  React.useEffect(() => {
    const el = scrollRef.current
    if (el.scrollWidth > el.offsetWidth) {
      setCanScrollRight(true)
    }
  }, [])

  React.useEffect(() => {
    if (onScrollEnd && !canScrollRight && canScrollLeft) {
      onScrollEnd()
    }
  }, [canScrollRight])

  const handleScroll = e => {
    if (e.target !== scrollRef.current) return
    const el = e.target
    const scroll = el.scrollLeft
    const maxScroll = el.scrollWidth - el.offsetWidth

    if (scroll > 0) {
      if (!canScrollLeft) setCanScrollLeft(true)
    } else if (canScrollLeft) setCanScrollLeft(false)

    if (scroll < maxScroll) {
      if (!canScrollRight) setCanScrollRight(true)
    } else if (canScrollRight) setCanScrollRight(false)
  }

  const scrollLeft = () => {
    const el = scrollRef.current
    const increment = Math.round(el.offsetWidth / 2)
    el.scrollLeft -= increment
  }

  const scrollRight = () => {
    const el = scrollRef.current
    const increment = Math.round(el.offsetWidth / 2)
    el.scrollLeft += increment
  }

  return (
    <div className={classes.root}>
      <div
        className={cx(classes.scrollContainer, {
          [classes.justifyCenter]: justifyCenter,
        })}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {children}
      </div>
      {canScrollLeft && (
        <>
          <Hidden mdUp>
            <div
              className={cx(
                classes.mobileScrollIndicator,
                classes.indicatorLeft,
              )}
            />
          </Hidden>
          <Hidden smDown>
            <IconButton
              className={cx(classes.desktopScrollButton, classes.buttonLeft)}
              onClick={scrollLeft}
            >
              <LeftIcon />
            </IconButton>
          </Hidden>
        </>
      )}
      {canScrollRight && (
        <>
          <Hidden mdUp>
            <div
              className={cx(
                classes.mobileScrollIndicator,
                classes.indicatorRight,
              )}
            />
          </Hidden>
          <Hidden smDown>
            <IconButton
              size={'medium'}
              className={cx(classes.desktopScrollButton, classes.buttonRight)}
              onClick={scrollRight}
            >
              <RightIcon />
            </IconButton>
          </Hidden>
        </>
      )}
    </div>
  )
}

HorizontalScroll.propTypes = {
  children: PropTypes.node.isRequired,
  justifyCenter: PropTypes.bool,
}

HorizontalScroll.defaultProps = {
  justifyCenter: false,
}

export default HorizontalScroll
