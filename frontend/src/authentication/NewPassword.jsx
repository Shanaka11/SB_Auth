// React Imports
import React, {useState, useContext} from 'react'
// Additiona React Imports
import {useHistory, useLocation} from 'react-router-dom'
// Local Imports
import {AuthenticationContext} from "../context"
import {Input} from '../utils'
// CSS Imports

const NewPassword = () => {
    // Context
    const {resetPassword} = useContext(AuthenticationContext)

    const history = useHistory()
    const location = useLocation()
    // States
    const [state, setState] = useState({
        password1 : "",
        password2 : ""
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
            // If success move to login page
            // Else Display error message and remain on the screen
            history.push("/")
        }
        const data = {
            "password1" : state.password1,
            "password2": state.password2
        }
        const decoded_url = location.pathname.split("/")
        const user = decoded_url[3]
        const token = decoded_url[4]
        resetPassword(user, token, handleFrontend, data)
    }    
    // OnClick Handlers
    // Return to login Screen
    const handleReturnLogin = (event) => {
        event.preventDefault()
        history.push("/")
    }        
    return (
        <div className="container page-center">
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group d-flex align-center">
                        <h1>Change Password</h1>
                    </div>
                    <div className="input-group">
                        <Input  type="password" 
                                setFinalValue={handleChange}
                                name = "password1" 
                                placeholder="Password" 
                                initialValue={state.password1} 
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
                        <div className="text-small link" onClick={ handleReturnLogin }>Back</div>
                        {/* Send Link */}
                        <button className="btn btn-login ml-auto" type="submit">Change Password</button>
                    </div>
                </form>                
            </div>                    
        </div>
    )
}

export default NewPassword
