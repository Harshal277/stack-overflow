import React from 'react'
import './Users.css'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'

import UsersList from './UsersList'

const Users = () => {
  const location = useLocation()

  return (
    <div className='homeContainer1'>
      <LeftSidebar />
      <div className="homeContainer2" style={{paddingTop: '50px'}}>
        <h1 style={{fontWeight: '400'}}>Users</h1>
        <UsersList /> 
      </div>
    </div>
  )
}

export default Users