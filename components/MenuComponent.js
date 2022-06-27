import React from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Link from 'next/link'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { useRouter } from 'next/router'

function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const location = useRouter()
  const { pathname } = location
  const splitLocation = pathname.split('/')

  function handleToggle() {
    setOpen(!open)
  }

  return (
    <div onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
      <Button
        style={{
          textDecoration:
            splitLocation[1] === 'news' || splitLocation[1] === 'blog'
              ? 'underline'
              : 'none',
          textTransform: 'none',
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: '400',
          lineHeight: '16px',
        }}
        buttonRef={(node) => {
          setAnchorEl(node)
        }}
        onClick={handleToggle}
      >
        Media
      </Button>

      <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <MenuList
                placement="bottom-start"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  placement: 'bottom-start',
                  horizontal: 'left',
                }}
              >
                <Link href="/news">
                  <MenuItem onClick={handleToggle}>News</MenuItem>
                </Link>
                <Link href="/blog">
                  <MenuItem onClick={handleToggle}>Blog</MenuItem>
                </Link>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default MenuComponent;
