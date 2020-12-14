// React Imports
import React, { useContext, useState } from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from "../context"
// CSS Imports

const Message = () => {
    // Context
    const {message, clearMessage} = useContext(AuthenticationContext)
    // States
    // Handle State Change 
    // Submit handler
    // OnClick Handlers
    const closeErrorBox = (event) => {
        event.preventDefault()
        clearMessage()
    }
    return (
        <>
        <div className="error-box-container">
            <div className="error-box">
                <div>{message["response"]["message"]}</div>
                <div className="error-box-close" onClick={closeErrorBox}>x</div>
            </div>
        </div>
        </>
    )
}

export default Message