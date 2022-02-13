import './Login.css'
import { authenticateUser } from '../logic'
import { useState } from 'react'
import Feedback from './Feedback'


function Login({ onAuthenticated, onRegister }) {
 
    const [emailFeedback, setEmailFeedback] = useState()
    const [passwordFeedback, setPasswordFeedback] = useState()
    const [feedback, setFeedback] = useState()

    const login = event => {
        event.preventDefault()


        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            authenticateUser(email, password)
                .then(token => {
                    onAuthenticated(token)
                })
                .catch(error => {
                    setEmailFeedback()
                    setPasswordFeedback()
                    setFeedback(error.message)
                })
        } catch (error) {
          
             const { message } = error
            
            setFeedback()
            
            if (message.includes('email')) {
                setPasswordFeedback()
                setEmailFeedback(message)
            } else if (message.includes('password')) {
                setEmailFeedback()
                setPasswordFeedback(message)
            }
        }
    }

    return <div className="login">
        <form className="login__form" onSubmit={login}>
            <input className={`login__email-input ${emailFeedback? 'login__input--error' : ''}`} type="_email" name="email" placeholder="e-mail" />
            {emailFeedback && <Feedback message={emailFeedback} level="error" version="mini" />}

            <input className={`login__password-input ${passwordFeedback? 'login__input--error' : ''}`} type="password" name="password" placeholder="password" />
            {passwordFeedback && <Feedback message={passwordFeedback} level="error" version="mini" />}

            <button>Login</button>
            {feedback && <Feedback message={feedback} level="error" />}

            <a className="login__register-link" href="" onClick={event => {
                event.preventDefault()

                onRegister()
            }}>Register</a>
        </form>
    </div>
}

export default Login