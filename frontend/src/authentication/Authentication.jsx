// React Imports
import React, { useState } from 'react'
// Additiona React Imports
// Local Imports
import Login from "./Login"
import Register from "./Register"
import PasswordReset from "./PasswordReset"
// CSS

const Authentication = () => {
    // Context    
    // States
    
    const [state, setState] = useState({
        page: 1
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
    // OnClick Handlers
    // UseEffect
    return (
        <>
        { /*   
            // When Page = 1 Then Login
            // When Page = 2 Then Register
            // When Page = 3 Forgot Password
        */}
        {state.page === 1 && <Login changeWindowCallback = {handleChange}/>}
        {state.page === 2 && <Register changeWindowCallback = {handleChange}/>}
        {state.page === 3 && <PasswordReset changeWindowCallback = {handleChange}/>}
        </>
    )
}

export default Authentication
