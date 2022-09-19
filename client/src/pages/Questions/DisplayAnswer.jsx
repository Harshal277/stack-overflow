import React from 'react'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'

import { Link, useParams } from 'react-router-dom' 
import Avatar from '../../components/Avatar/Avatar'

import {deleteAnswer} from '../../actions/question'



const DisplayAnswer = ({question, handleShare}) => {
    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    
    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1 ))
    }
    return (
    <div>
        {
            question.answer.map((ans) => (
                <div className="displayAns" key={ans._id}>
                    <p>{ ans.answerBody }</p>
                    <div className="questionActionsUser">
                        <div>
                            <button type='button' onClick={handleShare}>Share</button>
                            {
                                User !== null ? 
                                User.result._id === ans.userId && (
                                    <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers )}>Delete</button>
                                ):''
                            }
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <p>Answered { moment(ans.answeredOn).fromNow() }</p>
                            <Link to={`/Users/${question.userId}`} className="userLink" style={{color: '#0086d8'}}>
                                <Avatar backgroundColor = 'green'  w='30px' h='30px' borderRadius='0'>{ ans.userAnswered.charAt(0).toUpperCase() }</Avatar>
                                <div>
                                    { ans.userAnswered }
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer