import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <a href='#home'><MenuItem onClick={handleClose}>Home</MenuItem></a>
        <a href="#tvShows"><MenuItem onClick={handleClose}>TV Shows</MenuItem></a>
        <a href="#movies"><MenuItem onClick={handleClose}>Movies</MenuItem></a>
        <a href="#newPopular"><MenuItem onClick={handleClose}>New & Popular</MenuItem></a>
        <a href="#myList"><MenuItem onClick={handleClose}>My List</MenuItem></a>
      </Menu>
    </div>
  )
}