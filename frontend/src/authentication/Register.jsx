// React Imports
import React, { useState, useContext } from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from "../context"
import {Input} from '../utils'
// CSS

const Register = ({changeWindowCallback}) => {
    // Context
    const {register} = useContext(AuthenticationContext)
    
    // States
    const [state, setState] = useState({
        username: "",
        password: "",
        password2: "",
        email: "",
        first_name: "",
        last_name: ""         
    })
    // State Change
    const handleChange = (event) => {
        const {name, value} = event.target

        setState(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }
    // Submit handler
    const handleSubmit = (event) => {
        event.preventDefault()
        // Handle Response
        const handleFrontend = () => {
            const data = {
                target: {
                    name: "page",
                    value: 1
                }
            }        
            changeWindowCallback(data)            
        }

        // Handle Request
        const data = {
            "username": state.username,
            "password": state.password,
            "password2": state.password2,
            "email": state.email,
            "first_name": state.first_name,
            "last_name": state.last_name   
        }
        register(handleFrontend, data)
    }

    // OnClick Handlers
    // Return to login Screen
    const handleReturnLogin = (event) => {        
        event.preventDefault()
        const data = {
            target: {
                name: "page",
                value: 1
            }
        }        
        changeWindowCallback(data)
    }
    // UseEffect    

    // Render 
    return (
        <div className="container page-center">
            <div className="login-card">
                {/* Add the logo */}
                {/* Have the logo here */}
                {/* Register */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group d-flex align-center">
                        <h1>Register</h1>
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
                        <Input  type="email" 
                                setFinalValue={handleChange}
                                name = "email" 
                                placeholder="Email" 
                                initialValue={state.email} 
                                reset="FALSE"
                                required/>
                    </div>
                    <div className="input-group">
                        <Input  type="text" 
                                setFinalValue={handleChange}
                                name = "first_name" 
                                placeholder="First Name" 
                                initialValue={state.first_name} 
                                reset="FALSE"/>
                    </div>
                    <div className="input-group">
                        <Input  type="text" 
                                setFinalValue={handleChange}
                                name = "last_name" 
                                placeholder="Last Name" 
                                initialValue={state.last_name} 
                                reset="FALSE"/>
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
                    <div className="input-group">
                        <Input  type="password" 
                                setFinalValue={handleChange} 
                                name = "password2"
                                placeholder="Confirm Password" 
                                initialValue={state.password2} 
                                reset="FALSE"
                                required/>
                    </div>                    
                    <div className="input-group d-flex align-center">
                        <div className="text-small link" onClick={ handleReturnLogin }>Already Have an Account</div>
                        {/* Register */}
                        <button className="btn btn-login ml-auto" type="submit">Register</button>
                    </div>                                 
                </form>                
            </div>                    
        </div>
    )
}

export default Register
