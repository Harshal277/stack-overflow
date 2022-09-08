import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Questions = ({question}) => {
  return (
    <div className='displayQueContainer'>
        <div className="displayVotesAns">
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>votes</p>
        </div>
        <div className="displayVotesAns">
            <p>{question.noOfAnswers}</p>
            <p>answers</p>
        </div>
        <div className="displayQuestionDetails">
            <Link to={`/Questions/${question._id}`} className='questionTitleLink'>{question.questionTitle}</Link>
            <div className='displayTagsTime'>
                <div className='displayTags'>
                    {
                        question.questionTags.map((tag)=>(
                            <p key={tag}>{tag}</p>
                        ))
                    }
                </div>
                <p className="displayTime">
                    asked { moment(question.askedOn).fromNow() } by {question.userPosted }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Questions