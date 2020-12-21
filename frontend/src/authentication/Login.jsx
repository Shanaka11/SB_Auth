// React Imports
import React, {useState, useContext} from 'react'
// Local Imports
import {AuthenticationContext} from "../context"
import {Input} from '../utils'

// CSS Imports
import './authentication.css';

const Login = ({changeWindowCallback}) => {
    // Context
    const {logIn} = useContext(AuthenticationContext)

    // States
    const [state, setState] = useState({
        username : "",
        password: ""
    })

    // Handle State Change
    const handleChange = (event) => {
        const {name, value} = event.target

        setState(prevValue => {
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
        event.preventDefault()
        const data = {
            target: {
                name: "page",
                value: 2
            }
        }
        changeWindowCallback(data)
    }

    const handlePasswordReset = (event) => {
        // Handle Request
        event.preventDefault()
        const data = {
            target: {
                name: "page",
                value: 3
            }
        }
        changeWindowCallback(data)    
    }


    return (
        <div className="container page-center">
            <div className="login-card">
                <form onSubmit={handleLogin}>
                    <div className="input-group d-flex align-center">
                        <h1>Login</h1>
                    </div>                     
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
                    <div className="input-group d-flex align-center">
                        <div className="text-small link" onClick={ handleRegister }>Register</div>
                        <button className="btn btn-login ml-auto" type="submit">Log In</button>
                    </div> 
                    <div className="input-group d-flex">
                        <div className="text-small link" onClick={ handlePasswordReset }>Forgot Password ?</div>
                    </div>                                    
                </form>                
            </div>                    
        </div>
    )
}

export default Login