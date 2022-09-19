import React from 'react'

import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

const Home = () => {
  return (
    <div className='homeContainer1'>
        <LeftSidebar />
        <div className='homeContainer2'>
          <HomeMainbar />
          <RightSidebar />
        </div>
    </div>
  )
}

export default Home