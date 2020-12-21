// React Imports
import React, {useEffect, useState, useContext} from 'react'
// Additiona React Imports
import {useLocation} from 'react-router-dom'
// Local Imports
import {AuthenticationContext} from "../context"
// CSS Imports

const Activation = () => {
    // Context
    const {activateUserReq, activateUser, user} = useContext(AuthenticationContext)
    const location = useLocation()
    // Handle State Change
    // Submit handler
    // UseEffect
    useEffect(() => {        
        if(location.pathname.includes('/activate/')){
            // Has a Valid Token
            // Then directly call the activate api and activate the user, Set the user verified 
            const handleFrontend = () => {
                // Display a message noting either success or failure
            }
            const decoded_url = location.pathname.split("/")
            const token = decoded_url[4]
            activateUser(token, handleFrontend)
        }
    }, [])

    // OnClick Handlers
    const sendActivationLink = () => {
        const handleFrontend = () => {
            // Display a message saying that an e-mail is sent or if there was an error
        }
        activateUserReq(handleFrontend)
    }

    return (
        <div className="container page-center">
            <div className="login-card">
                {/* Add the logo */}
                {/* Have the logo here */} 
                <div className="input-group d-flex align-center">
                    <h1>Successfully Logged on, Account Verification needed</h1>                    
                </div>      
                <div className="input-group d-flex align-center">
                    <div className="text-small">An Email with the verification link has been sent to the provided email address if not please <span className="link" onClick={sendActivationLink}>click here</span></div>
                </div>                                                                 
            </div>                    
        </div>
    )
}

export default Activation
