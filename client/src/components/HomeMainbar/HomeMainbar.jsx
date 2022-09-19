import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionsList from './QuestionsList'
const HomeMainbar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  var user = useSelector((state) => (state.currentUserReducer))

  const questionsList = useSelector(state => state.questionsReducer)
  const checkAuth = () => {
    if(user === null){
      alert('Login or sign up to ask a question')
      navigate('./Auth')
    }else{
      navigate('./AskQuestion')
    }
  }

  return (
    <div className="mainBar">
      <div className="mainBarHeader">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='askBtn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null ? 
          <h1>Loading...</h1> :
          <>
            <p>{ questionsList.data.length } questions</p>
            <QuestionsList questionsList = {questionsList.data} />
          </> 
        }
      </div>
    </div>
  )
}

export default HomeMainbar