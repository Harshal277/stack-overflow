import React from 'react'
import './RightSidebar.css'
import iconcomment from '../../assets/comment-icon.svg'
import iconpen from '../../assets/pen-icon.svg'
import iconstack from '../../assets/favicon.ico'

const Widget = () => {
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="rightSidebarDiv1">
        <div className="rightSidebarDiv2">
          <img src={ iconpen } alt="pen" width='15' />
          <p>Observability is key to the future of software find your DevOps connect</p>
        </div>
        <div className="rightSidebarDiv2">
          <img src={ iconpen } alt="pen" width='15' />
          <p>Podcast 374: New valuable is your screen name?</p>
        </div>
      </div>

      <h4>Featured on Meta</h4>
      <div className="rightSidebarDiv1">
        <div className="rightSidebarDiv2">
          <img src={ iconcomment } alt="pen" width='15' />
          <p>Review queue workflow - final release</p>
        </div>
        <div className="rightSidebarDiv2">
          <img src={ iconcomment } alt="pen" width='15' />
          <p>What companies lose when they track worker productivity (Ep. 478)</p>
        </div>
        <div className="rightSidebarDiv2">
          <img src={ iconstack } alt="pen" width='15' />
          <p>Staging Ground Workflow: Question Lifecycle</p>
        </div>
      </div>

      <h4>Hot Meta Posts</h4>
      <div className="rightSidebarDiv1">
        <div className="rightSidebarDiv2">
          <p>38</p>
          <p>How should we clean up [type-annotation]?</p>
        </div>
        <div className="rightSidebarDiv2">
          <p>27</p>
          <p>Podcast 374: New valuable is your screen name?</p>
        </div>
        <div className="rightSidebarDiv2">
          <p>15</p>
          <p>Is as link to the "How to ask" help page yseful comment?</p>
        </div>
      </div>

    </div>
  )
}

export default Widget