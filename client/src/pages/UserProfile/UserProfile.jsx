import React, { useState } from 'react'
import moment from 'moment'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'

import ProfileBio from './ProfileBio'
import EditProfileForm from './EditProfileForm'

import { FaBirthdayCake } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'

import './UsersProfile.css'
import GMaps from './GMaps'

const UserProfile = () => {
    const { id } = useParams()    
    
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => (state.currentUserReducer))
  
    const [Switch, setSwitch] = useState(false)
    
    if(typeof(currentProfile) !== "undefined"){
        return (
            <div className='homeContainer1'>
                <LeftSidebar />
                <div className="homeContainer2">
                    <section>
                        <div className="userDetailsContainer">
                            <div className="userDetails">
                                <Avatar backgroundColor='purple' color='white' fontSize='15px' w='100px' h='100px' borderRadius='0'> 
                                    {currentProfile !== null ? currentProfile.name.charAt(0).toUpperCase() : ''}
                                </Avatar>
                                <div className="userName">
                                    <h1>{currentProfile !== null ? currentProfile.name : ''}</h1>
                                    <p><FaBirthdayCake /> Joined {moment(currentProfile !== null ? currentProfile.joinedOn : '').fromNow()}</p>
                                </div>
                            </div>
                            {
                                currentUser !== null &&
                                currentUser.result._id === id && (
                                    <button type="button" onClick={() => setSwitch(true)} className="editProfileBtn">
                                        <FiEdit2 /> Edit Profile
                                    </button>
                                ) 
                            }
                        </div>
                        <>
                        {
                            Switch ? (
                                <EditProfileForm setSwitch={setSwitch} currentUser = {{'result':currentProfile}} />
                                ) : (
                                    <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                        {
                            currentUser !== null &&
                            currentUser.result._id === id && (
                                <GMaps />
                            )
                        }
                        
                        </>
                    </section>
                </div>
            </div>
        )
    }
}


export default UserProfile