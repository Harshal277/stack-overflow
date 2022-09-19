import React, { useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { VscTriangleUp, VscTriangleDown } from 'react-icons/vsc'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'react-copy-to-clipboard'

import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'

const QuestionDetails = () => {
    const { id } = useParams()

    const questionsList = useSelector(state => state.questionsReducer)
    var User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'https://stack-clone-by-harshal.netlify.com'

    const [ Answer, setAnswer ] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePostAns = (e, answerLength) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }))
            }
        }
    }

    const handleShare = () => {
        copy(url + location.pathname )
        alert('Copied question url: '+url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id ))
    }
    
    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id ))
    }

    return (
        <div className="questionDetailsPage">
        {
            questionsList.data === null ? 
            <h1>Loading...</h1> :
            <>
            {
                questionsList.data.filter(question => question._id === id).map(question => (
                    <div key={question._id }>
                        <section className="questionDetailsContainer">
                            <h1>{question.queTitle}</h1>
                            <div className="questionDetailsContainer2">
                                <div className="questionVotes">
                                    <VscTriangleUp className='votesIcon' onClick={handleUpVote} />
                                    <p>{ question.upVote.length - question.downVote.length }</p>
                                    <VscTriangleDown className='votesIcon' onClick={handleDownVote} />
                                </div>
                                <div style={{width:'100%'}}>
                                    <p className='questionBody'>{ question.questionBody }</p>
                                    <div className="questionDetailsTags">
                                        {
                                            question.questionTags.map(tag => (
                                                <p key={tag}>{tag}</p>
                                            ))
                                        }
                                    </div>
                                    <div className="questionActionsUser">
                                        <div>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {
                                                User !== null ? 
                                                User.result._id === question.userId && (
                                                    <button type='button' onClick={handleDelete}>Delete</button>
                                                )
                                                :
                                                ''
                                            }
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <p>asked { moment(question.postedOn).fromNow() } </p>
                                            <Link to={`/Users/${question.userId}`} className="userLink" style={{color: '#0086d8'}}>
                                                <Avatar backgroundColor = 'orange' w='25px' h='25px' borderRadius='0'>{ question.userPosted.charAt(0).toUpperCase() }</Avatar>
                                                <div>
                                                    { question.userPosted }
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{ question.noOfAnswers } Answers</h3>
                                    <DisplayAnswer key={ question.id } question={ question } handleShare={handleShare}/>
                                </section>
                            )
                        }

                        <section className='postAnsContainer'>
                            <h3>Your Answer</h3>
                            <form onSubmit={ (e) => { handlePostAns(e, question.answer.length ) } }>
                                <textarea id="" cols='30' rows='10' onChange={e => setAnswer(e.target.value)}></textarea> <br />
                                <input type="submit" value="Post Your Answer" className='postAnsBtn' />
                            </form>
                            <p>
                                Browse other Question tagged
                                {
                                    question.questionTags.map((tag) => (
                                        <Link to='/Tags' key={tag} className='ansTags'>{tag} </Link>
                                    ))
                                } or  
                                <Link to='/AskQuestion' style={{textDecoration: 'none', color: '#009dff'}}> ask your own question.</Link>
                            </p>
                        </section>
                    </div>
                ))
            }
            </>
        }
        </div>
    )
}

export default QuestionDetails              