import React from 'react'

const Avatar = ({children, backgroundColor, w, h, px, py, color, borderRadius, fontSize, cursor }) => {
  const style = {
    backgroundColor, 
    padding: `${py} ${px}`, 
    width: `${w}`,
    height: `${h}`,
    color: color || 'black', 
    borderRadius: borderRadius || '50%', 
    display: 'grid',
    placeItems: 'center',
    fontSize, 
    textAlign: 'center',
    cursor: cursor | 'pointer',
    textDecoration: 'none'
  }
  return (
    <div style={style}>
      { children }
    </div>
  )
}

export default Avatar