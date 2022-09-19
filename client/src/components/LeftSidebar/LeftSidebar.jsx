import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'

import Globe from '../../assets/Globe.svg'

const LeftSidebar = () => {
  return (
    <div className='leftSidebar'>
        <nav className='sideNav'>
          <NavLink to='/' className='sideNavLinks' activeclass='active'>
            <p>Home</p>
          </NavLink>
          <div className='sideNavDiv'>
            <div><p>PUBLIC</p></div>
            <NavLink to='/Questions' className="sideNavLinks" activeclass='active'>
              <img src={Globe} alt="Globe" width={15}/>
              <p style={ {paddingLeft: '10px' }}>Questions</p>
            </NavLink>
            <NavLink to='/Tags'  className="sideNavLinks" activeclass='active' style={{paddingLeft: "40px"}}>
              <p>Tags</p>
            </NavLink>
            <NavLink to='/Users'  className="sideNavLinks" activeclass='active' style={{paddingLeft: "40px"}}>
              <p>Users</p>
            </NavLink>
          </div>
        </nav>
    </div>
  )
}

export default LeftSidebar