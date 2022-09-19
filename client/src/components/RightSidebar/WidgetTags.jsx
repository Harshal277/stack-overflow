import React from 'react'

const WidgetTags = () => {
  
  const tags = ['c', 'c++', 'express', 'css', 'java' , 'firebase', 'html', 'js', 'mern', 'reactjs', 'sql', 'mangodb']

  return (
    <div className="widgetTags">
      <h4>Watched Tags</h4>
      <div className="widgetTagsDiv">
        {
          tags.map((tag) => (
            <p key={tag}>{tag}</p>       
          ))
        }
      </div>
    </div>
  )
}

export default WidgetTags