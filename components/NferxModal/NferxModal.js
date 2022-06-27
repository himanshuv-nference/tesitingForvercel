import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import NferxCard from '../NferxCard/NferxCard'
import cx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1300,
  },
  contents: {
    outline: 'none',
    overflow: 'hidden',
    margin: 'auto',
  },
  card: {
    width: 600,
    maxHeight: `calc(100vh - ${theme.appBarHeight + 2 * theme.pad.lg}px)`,
    maxWidth: `calc(100vw - ${2 * theme.pad.sm}px)`,
    marginTop: theme.appBarHeight,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      height: '100vh',
      width: '100vw',
      margin: 0,
      maxWidth: 'unset',
      maxHeight: 'unset',
    },
  },
  contentRoot: {
    display: 'block',
  },
  contentWrapper: {
    // maxHeight: 600,
  },
})

class NferxModal extends Component {
  static propTypes = {
    /**
     * Title of the modal
     * */
    title: PropTypes.node,
    /**
     * Rendered on the left side of the modal header
     * */
    left: PropTypes.node,
    /**
     * Rendered on the right side of the modal header
     * */
    right: PropTypes.node,
    /**
     * Is the modal open
     * */
    open: PropTypes.bool.isRequired,
    /**
     * callback function called when the user has requested to close the modal
     * */
    onClose: PropTypes.func.isRequired,
    /**
     * Accepts {modalClassName, ...rest}. To apply any class to MUI Modal, pass it in modalClassName
     * */
    modalProps: PropTypes.object,
    /**
     * If true, close icon is not renders at the top right
     * */
    noCloseInRight: PropTypes.bool,
    /**
     * If true, modal does not close when clicked outside the modal
     * */
    disableBackdropClick: PropTypes.bool,
  }

  static defaultProps = {
    modalProps: {},
    noCloseInRight: false,
    disableBackdropClick: false,
  }

  render() {
    const {
        classes,
        children,
        open,
        onClose,
        className,
        modalProps,
        disableBackdropClick,
        right,
        left,
        title,
        noCloseInRight,
        ...rest
      } = this.props,
      { className: modalClassName, ...restOfModalProps } = modalProps

    return (
      <Modal
        open={open}
        onClose={onClose}
        className={cx(classes.root, modalClassName)}
        disableBackdropClick={disableBackdropClick}
        onClick={e => {
          e.stopPropagation()
        }}
        onMouseDown={e => {
          e.stopPropagation()
        }}
        onFocus={e => {
          e.stopPropagation()
        }}
        {...restOfModalProps}
      >
        <div className={classes.contents}>
          <NferxCard
            variant={'raised'}
            className={cx(classes.card, className)}
            classes={{
              contentWrapper: classes.contentWrapper,
            }}
            scrollable
            {...rest}
            right={
              right ? (
                right
              ) : !noCloseInRight ? (
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              ) : null
            }
            left={left ? left : null}
            title={title ? title : null}
          >
            {children}
          </NferxCard>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(NferxModal)
