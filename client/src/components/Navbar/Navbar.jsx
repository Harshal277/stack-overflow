import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import './Navbar.css'

import logo from '../../assets/logo-stackoverflow.svg'
import search from '../../assets/search-icon.svg'
import Avatar from '../../components/Avatar/Avatar'

import {setCurrentUser} from '../../actions/currentUser'

export const Navbar = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  var user = useSelector((state) => (state.currentUserReducer))
  
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    dispatch(setCurrentUser(null))
  } 

  useEffect(() => {
    if(user != null){
      const token = user.token
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogout()
        } 
      }
    }
    dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
  }, [dispatch])

  return (
    <nav className='mainTopNav'>
        <div className="navbar">
            <Link to='/' className='navItem navLogo'>
                <img src={ logo } alt="Logo" width="120px"/>
            </Link>
            <Link to='/about' className='navItem navBtn'>About</Link>
            <Link to='/about' className='navItem navBtn'>Products</Link>
            <Link to='/about' className='navItem navBtn'>For Team</Link>

            <form>
              <input type="text" placeholder='Search...' />
              <img src={search} className="searchIcon" alt="Search" width="18"/>
            </form>

            { 
              user === null ? 
              <Link to='/Auth' className='navItem navLinks'>Log In</Link> :
              <>
                <Link to={`/Users/${user.result._id }`} className=''><Avatar backgroundColor='#009dff' w='30px' h='30px' borderRadius='50%' border='none' color='white'>{user.result.name.charAt(0).toUpperCase()}</Avatar></Link>
                <button className='navItem navLinks' onClick={handleLogout}>Log out</button>
              </>  
            }
        </div>
    </nav>
  )
}
