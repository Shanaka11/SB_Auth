// React Imports
import React, {useState, useContext} from 'react'
import {AuthenticationContext} from "../context"
import {Input} from '../utils'

// CSS Imports
import './authentication.css';

const Login = () => {
    // Context
    const {logIn} = useContext(AuthenticationContext)

    // States
    const [state, setstate] = useState({
        username : "",
        password: ""
    })

    // Handle State Change
    const handleChange = (event) => {
        const {name, value} = event.target

        setstate(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }
    
    // Handle onClink Methods
    const handleLogin = (event) =>{
        event.preventDefault()
        // Handle Request
        const data = {
            "username": state.username,
            "password": state.password
        }
        logIn(data)
    }

    const handleRegister = (event) => {
        // Handle Request
    }

    const handlePasswordReset = (event) => {
        // Handle Request        
    }


    return (
        <div className="container page-center">
            <div className="login-card">
                {/* Add the logo */}
                {/* Have the logo here */}
                {/* Sign In */}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <Input  type="text" 
                                setFinalValue={handleChange}
                                name = "username" 
                                placeholder="Username" 
                                initialValue={state.username} 
                                reset="FALSE"
                                required/>
                    </div>
                    <div className="input-group">
                        <Input  type="password" 
                                setFinalValue={handleChange} 
                                name = "password"
                                placeholder="Password" 
                                initialValue={state.password} 
                                reset="FALSE"
                                required/>
                    </div>
                    <div className="input-group d-flex justify-center">
                        <div className="text-small pointer link" onClick={ handleRegister }>Register</div>
                        {/* Log In */}
                        <button className="btn btn-login ml-auto" type="submit">Log In</button>
                    </div> 
                    <div className="input-group d-flex justify-center">
                        <div className="text-small pointer link" onClick={ handlePasswordReset }>Forgot Password ?</div>
                    </div>                                    
                </form>                
            </div>                    
        </div>
    )
}

export default Login