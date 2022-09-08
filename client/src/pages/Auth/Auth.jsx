import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Auth.css'
import icon from '../../assets/Stack_Overflow_icon.svg'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {
    const [ isSignup, setIsSignup ] = useState(true)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        setIsSignup(!isSignup)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email && !password ){
            alert("Enter your Email ID and passwword")
        }
        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch(signup(navigate, { name, email, password }))
        }else{
            dispatch(login(navigate, { email, password }))
        }
    }

    return (
        <section className='authSection'>
            { isSignup && <AboutAuth /> }
            <div className='authContainer2'>
                { !isSignup && <img width={60} src={icon} alt='Stack Overflow' className='loginLogo' /> }
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor="name">
                                <h4>Display Name</h4>
                                <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value)}} />
                            </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name="email" id="email"  onChange={(e) => {setEmail(e.target.value)}} />
                    </label>
                    <label htmlFor="pass">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Password</h4>
                            { !isSignup && <p style={{color: '#007ac6', fontSize: '13px'}}>Forget password?</p>}
                        </div>
                        <input type="password" name="pass" id="pass"  onChange={(e) => {setPassword(e.target.value)}} />
                        { isSignup && <p className='msg'>Passwords must contain at least 8 characters, <br /> including at least 1 letter and <br /> 1 number</p> }
                    </label>
                    { 
                        isSignup && (
                            <label htmlFor="check">
                                <input type="checkbox" name="check" id="check" />
                                <p style={{fontSize: "13px"}}>Opt-in to receive occasional, <br />product updates, user research invitions, <br /> company announsments, and digests</p>
                            </label>
                        ) 
                    }
                    <button type="submit" className='authBtn'>{ isSignup ? 'Sign Up' : 'Login' }</button>
                    { 
                        isSignup && (
                            <p className='msg'>By clicking "Sign Up", you agree to our 
                                <span> terms of <br /> service</span>, 
                                <span> privacy policy</span> and 
                                <span> cookie policy</span></p>
                        )
                    }
                </form>
                <p>
                    { isSignup ? "Already have an account? " : "Don't have an account? " }
                    <button type='button' className='handleSwitchBtn' onClick={ handleSwitch }>{ isSignup ? "Login" : "Sign Up" }</button>
                </p>
            </div>
         </section>
    )
}

export default Auth