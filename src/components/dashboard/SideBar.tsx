import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  
}

function SideBar({}: Props): ReactElement {
  return (
    <div className="sidebar">
      <NavLink to="/" activeClassName="selected">
        Home
      </NavLink>
      <NavLink to="/posts" activeClassName="selected">
        Posts
      </NavLink>
    </div>
  )
}

export default SideBar
