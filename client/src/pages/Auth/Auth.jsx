import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';

import jwt from 'jsonwebtoken'
import { setCurrentUser } from '../../actions/currentUser'

import './Auth.css'
import icon from '../../assets/Stack_Overflow_icon.svg'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

import '../../firebase.js'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const _isContains = (json, value) => {
    let contains = -1;
    for (let index = 0; index < json.length; index++) {
        if(json[index].hasOwnProperty('mob')){
            if(json[index].mob === value){
                return index;
            } 
        }        
    }
    return contains
}

const Auth = () => {
    const users = useSelector((state) => (state.usersReducer))

    const [ isSignup, setIsSignup ] = useState(false)
    const [ isOtpNotVerified, setOtpVerify ] = useState(true)
    const [ isOtpSuccess, setisOtpSuccess ] = useState(false)

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ otp, setOTP ] = useState('')
    const [ mobile, setMobile ] = useState('')
    const [ mob, setMob ] = useState('')

    const [Msg, setMsg] = useState('')

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
            dispatch(signup(navigate, { name, email, password, mob }))
        }else{
            dispatch(login(navigate, { email, password }))
        }
    }

    const configureCaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
                console.log('recaptcha verified');
            },
            defaultCountry: 'IN'
        }, auth);
    }

    const onSignInSubmit = () => {
        // check if no exits
        var userIndex = _isContains(users, mobile) 
        if( userIndex !== -1 ){
            const token = jwt.sign({ email: users[userIndex].email, id: users[userIndex]._id }, 'test', {expiresIn: '1h'})
            var userdata = { result: users[userIndex], token }
            localStorage.setItem('Profile', JSON.stringify( userdata ))

            setMsg('Wait while we send OTP')
            configureCaptcha()
            
            const phoneNumber = '+91' + mobile
            
            const appVerifier = window.recaptchaVerifier;
            
            const auth = getAuth();
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    window.confirmationResult = confirmationResult;
                    setisOtpSuccess(true)
                    setMsg('')
                    console.log('OTP has been sent');
                }).catch((error) => {
                    // Error; SMS not sent
                    setMsg('There was some problem while sending OTP')
                    console.log(error);
            });
        }else{
            setMsg('Mobile number is not registered')
        }
    }

    const onSubmitOTP = () => {
        setMsg('Please wait')
        const code = otp
        
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user));
            dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
            navigate('/')
            setOtpVerify(false)
        }).catch((error) => {
            setMsg("OTP is not verified, you can't login")
            console.log(error);
        });
    }

    const useCredentials = () => {
        setOtpVerify(false)
        setIsSignup(false)
        setisOtpSuccess(true)
    }

    return (
        <section className='authSection'>
            { isSignup && <AboutAuth /> }
            <div className='authContainer2'>
                { !isSignup && <img width={60} src={icon} alt='Stack Overflow' className='loginLogo' /> }
                {
                    !isSignup && (
                        isOtpNotVerified && (
                            !isOtpSuccess &&(
                                <>
                                    <div className='form'>
                                        <div id="sign-in-button"></div>
                                        <label htmlFor="mob">
                                            <h4>Enter Mobile</h4>
                                            <input type="number" name="mob" id="mob" required onChange={(e) => {setMobile(e.target.value)}} />
                                        </label>
                                        <button type="button" className='authBtn' onClick={() => onSignInSubmit()}>Send OTP</button>
                                        <p id='watingMsg'>{Msg}</p>
                                        <button onClick={() => useCredentials()}>Login with user credentials</button>
                                    </div>
                                </>
                            )
                        )
                    )
                }
                {
                    !isSignup && (
                        isOtpNotVerified && (
                            isOtpSuccess && (
                                <>
                                    <div className='form'>
                                        <label htmlFor="otp">
                                            <h4>Enter OTP</h4>
                                            <p>We have sent OTP on your mobile</p>
                                            <OtpInput
                                                containerStyle={{display: 'flex', justifyContent: 'space-between'}}
                                                value={otp}
                                                onChange={setOTP}
                                                numInputs={6}
                                                separator={<span></span>}
                                            />
                                        </label>
                                        <button type="button" className='authBtn' onClick={() => onSubmitOTP()}>Verify</button>
                                        <p id='watingMsg'>{Msg}</p>
                                    </div>
                                </>
                            )
                        )
                    )
                }
                {
                    !isOtpNotVerified && (
                        <form onSubmit={handleSubmit} className='form'>
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
                        
                        {
                            isSignup && (
                                <label htmlFor="mob">
                                    <h4>Mobile Number</h4>
                                    <input type="text" name="mob" id="mob"  onChange={(e) => {setMob(e.target.value)}} />
                                </label>
                            )
                        }
                        
                        <label htmlFor="pass">
                            <h4>Password</h4>
                            <input type="password" name="pass" id="pass"  onChange={(e) => {setPassword(e.target.value)}} />
                        </label>

                        { isSignup && <p className='msg'>Passwords must contain at least 8 characters, including at least 1 letter and 1 number</p> }

                        { 
                            isSignup && (
                                <label htmlFor="check" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <input type="checkbox" name="check" id="check" style={{width: '15px'}} />
                                    <p style={{fontSize: "13px"}}>Opt-in to receive occasional, product updates, user research invitions, company announsments, and digests</p>
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
                    )
                }
                {
                    isSignup && (
                        isOtpNotVerified && (
                            <form onSubmit={handleSubmit} className='form'>
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

                            {
                                isSignup && (
                                    <label htmlFor="mob">
                                        <h4>Mobile Number</h4>
                                        <input type="text" name="mob" id="mob"  onChange={(e) => {setMob(e.target.value)}} />
                                    </label>
                                )
                            }
                            
                            <label htmlFor="pass">
                                <h4>Password</h4>
                                <input type="password" name="pass" id="pass"  onChange={(e) => {setPassword(e.target.value)}} />
                            </label>

                            { isSignup && <p className='msg'>Passwords must contain at least 8 characters, including at least 1 letter and 1 number</p> }

                            { 
                                isSignup && (
                                    <label htmlFor="check" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <input type="checkbox" name="check" id="check" style={{width: '15px'}} />
                                        <p style={{fontSize: "13px"}}>Opt-in to receive occasional, product updates, user research invitions, company announsments, and digests</p>
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
                        )
                    )
                }
                <p>
                    { isSignup ? "Already have an account? " : "Don't have an account? " }
                    <button type='button' className='handleSwitchBtn' onClick={ handleSwitch }>{ isSignup ? "Login" : "Sign Up" }</button>
                </p>
                
            </div>
         </section>
    )
}

export default Auth