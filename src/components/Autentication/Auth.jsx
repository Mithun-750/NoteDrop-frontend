import React from 'react'
import './Auth.css'
import LoginForm from './Login/LoginForm'


export default function Auth({ setmessage, setShowmessage }) {
    return (
        <div className='auth-container'>
            <div className="auth-inner">
                <h2>Login/Signup to continue</h2>

                <LoginForm setShowmessage={setShowmessage} setmessage={setmessage} />
            </div>
        </div>
    )
}
