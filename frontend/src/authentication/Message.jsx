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
    const [state, setState] = useState({
        show: true
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
    // OnClick Handlers
    const closeErrorBox = (event) => {
        event.preventDefault()
        const temp_event = {
            target: {
                "name": "show",
                "value": false
            }
        }
        clearMessage()        
        // handleChange(temp_event)
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