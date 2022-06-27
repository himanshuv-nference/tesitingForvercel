import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { ClickAwayListener, useMediaQuery } from '@material-ui/core'
import NferxCard from '../NferxCard/NferxCard'
import Chip from './Chip'
import Button from '@material-ui/core/Button'
import { useIsFirstRender } from '../../utils/useIsFirstRender'

const popperOptions = {
  modifiers: {
    offset: {
      offset: '0, 4',
    },
  },
}

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1300,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      position: 'fixed !important',
      transform: 'none !important',
      willChange: 'initial !important',
    },
  },
  cardRoot: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
    },

    [theme.breakpoints.up('sm')]: {
      maxHeight: 400,
      maxWidth: `calc(100vw - ${2 * theme.pad.xs}px)`,
      boxShadow: theme.shadows[10],
    },
  },
  cardRightWrapper: {
    marginRight: 0,
  },
  cardContentWrapper: {
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',

    overscrollBehavior: 'none',
  },
  closeButton: {
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
  small: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  medium: {
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
  },
  large: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
}))

function ChipFilter(props) {
  const {
    label,
    value,
    onDelete,
    isDefault,
    children,
    title,
    variant,
    closeOnChange,
    size,
    placement,
    defaultIcon,
    info,
    className,
    onClose,
    disabled,
    showDoneButton,
    forceClose,
    showCloseButton,
    ...rest
  } = props

  const classes = useStyles(props)

  const [open, setOpen] = React.useState()
  const [anchorEl, setAnchorEl] = React.useState()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'))

  const cardRef = React.useRef()
  const chipRef = React.useRef()
  const isFirstRender = useIsFirstRender()

  const id = open ? 'chip-filter-popper' : null

  const handleDocumentClick = (e) => {
    closePopover()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      closePopover()
    }
  }

  const closePopover = () => {
    setOpen(false)
  }

  const toggleExpand = (event) => {
    setOpen((prev) => !prev)
    setAnchorEl(ReactDOM.findDOMNode(chipRef.current))
  }

  React.useEffect(() => {
    if (!open) {
      document.body.style = ''
      if (!isFirstRender && onClose) {
        onClose()
      }
    }
  }, [open])

  React.useEffect(() => {
    if (open && isMobile) {
      document.body.style = 'overflow: hidden'
    }
  }, [open, isMobile])

  React.useEffect(() => {
    if (closeOnChange && open) {
      closePopover()
    }
  }, [JSON.stringify(value)])

  React.useEffect(() => {
    if (forceClose && open) {
      closePopover()
    }
  }, [forceClose])

  return (
    <>
      <Chip
        ref={chipRef}
        label={label}
        isDefault={isDefault}
        variant={variant}
        onDelete={onDelete}
        onClick={toggleExpand}
        defaultIcon={defaultIcon}
        disabled={disabled}
        className={className}
      />
      {open && children && (
        <ClickAwayListener onClickAway={handleDocumentClick}>
          <Popper
            className={classes.popper}
            id={id}
            open={open}
            anchorEl={anchorEl}
            transition
            placement={placement}
            popperOptions={popperOptions}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                timeout={350}
                style={{ transformOrigin: '50% 0 0' }}
              >
                <NferxCard
                  ref={cardRef}
                  classes={{
                    rightWrapper: classes.cardRightWrapper,
                    root: cx(classes.cardRoot, {
                      [classes.small]: size === 'small',
                      [classes.medium]: size === 'medium',
                      [classes.large]: size === 'large',
                    }),
                    contentWrapper: classes.cardContentWrapper,
                  }}
                  variant={'raised'}
                  onKeyDown={handleKeyDown}
                  scrollable
                  right={
                    showCloseButton && (
                      <IconButton onClick={closePopover}>
                        <CloseIcon />
                      </IconButton>
                    )
                  }
                  footerRight={
                    (isMobile || showDoneButton) && (
                      <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={closePopover}
                      >
                        Done
                      </Button>
                    )
                  }
                  title={title}
                  {...rest}
                >
                  {children}
                </NferxCard>
              </Grow>
            )}
          </Popper>
        </ClickAwayListener>
      )}
    </>
  )
}

ChipFilter.propTypes = {
  children: PropTypes.node.isRequired,
  isDefault: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  value: PropTypes.any, // required if using closeOnChange
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  closeOnChange: PropTypes.bool,
  onClose: PropTypes.func,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  showCloseButton: PropTypes.bool,
}

ChipFilter.defaultProps = {
  variant: 'dark',
  size: 'medium',
  placement: 'bottom-start',
  disabled: false,
  showCloseButton: false,
}

export default ChipFilter
