// React Imports
import React, {useState, useContext} from 'react'
// Local Imports
import {AuthenticationContext} from "../context"
import {Input} from '../utils'
// CSS Imports

const PasswordReset = ({changeWindowCallback}) => {
    // Context
    const {resetPasswordReq} = useContext(AuthenticationContext)

    // States
    const [state, setState] = useState({
        username : "",
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

    // Submit handler    
    const handleSubmit = (event) => {
        event.preventDefault()
        const handleFrontend = () => {
            const event = {
                target: {
                    name: "page",
                    value: 1
                }
            }             
            changeWindowCallback(event)            
        }
        const data = {
            "username" : state.username,
        }
        resetPasswordReq(handleFrontend, data)
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

    return (
        <div className="container page-center">
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group d-flex align-center">
                        <h1>Reset Password</h1>
                    </div>
                    <div className="input-group d-flex align-center">
                        <div className="text-small link">An email with an activation link is will be sent to the provided email address</div>                    
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
                    <div className="input-group d-flex align-center">
                        <div className="text-small link" onClick={ handleReturnLogin }>Back</div>
                        {/* Send Link */}
                        <button className="btn btn-login ml-auto" type="submit">Send Password Reset Link</button>
                    </div>
                </form>                
            </div>                    
        </div>
    )
}

export default PasswordReset
