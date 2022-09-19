import React from 'react'
import { useState } from 'react';

const GMaps = () => {
  const [Lat, setLat] = useState('')
  const [Lon, setLon] = useState('')
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    
  })

  const path = `https://maps.google.com/maps?q=${Lat},${Lon}&hl=en&z=14&amp;&output=embed`
  return (
    <>
      <h4>User's Location</h4> 
      <span><b>Latitude</b> : {Lat} </span>
      <span><b>Longitude</b> : {Lon} </span>
      {
        Lat !== '' ? 
        <div style={{width: '100%', margin: '2% 0'}}><iframe title='User Location' width='60%' height='300' frameBorder='0' scrolling='no' src={path}></iframe></div>
        : <p>Can't retrive user location, please give location access</p>
      }
    </>
  )
}

export default GMaps