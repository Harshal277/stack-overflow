import React, { useState } from 'react'
import './AskQuestion.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('') 
    const [questionBody, setQuestionsBody] = useState('') 
    const [questionTags, setQuestionTags] = useState('') 
    
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log({questionsTitle, questionsBody, questionTags});
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id }, navigate))
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionsBody(questionBody + '\n')
        }
    }

    return (
        <div className='askQues'>
            <div className="askQuesContainer">
                <h1>Ask a public question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="askFormContainer">
                        <label htmlFor="askQuesTitle">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person</p>
                            <input type="text" id="askQuesTitle" onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector' />
                        </label>
                        <label htmlFor="askQuesBody">
                            <h4>Body</h4>
                            <p>Inside of the information someone would need to answer your question</p>
                            <textarea id="askQuesBody" rows={7} onChange={(e) => {setQuestionsBody(e.target.value)}} onKeyPress={handleEnter}></textarea>
                        </label>
                        <label htmlFor="askQuesTags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to decide what your question is about</p>
                            <input type="text" id="askQuesTags" onChange={(e) => {setQuestionTags(e.target.value.split(' '))}} placeholder='e.g. (xml javascript wordpress)' />
                        </label>
                    </div>
                    <input type="submit" className='reviewBtn' value="Review your question" />
                </form>
            </div>
        </div>
    )
}

export default AskQuestion