// React Imports
import React, {useContext, useEffect, useState} from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from '../context'
// CSS
import './components.css'

const Navbar = () => {

    // Context
    const {user, currentUser, logOut} = useContext(AuthenticationContext)

    // States
    const [state, setState] = useState({
        dropdown: false,
        classname: "nav-dropdown-container hide"
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
    const handleLogout = () => {
        logOut()
    }

    const handleDropdown = () => {
        let event = {}
        if (state.classname === "nav-dropdown-container hide"){
            event = {
                "target": {
                    "name": "classname",
                    "value": "nav-dropdown-container"
                }
            }
        }else{
            event = {
                "target": {
                    "name": "classname",
                    "value": "nav-dropdown-container hide"
                }
            }            
        }
        handleChange(event)
    }
    // UseEffect
    useEffect(()=>{
        currentUser()
    }, [])

    return (
        <nav className="nav">
            <div className="nav-user" onClick={handleDropdown}>
                {user.first_name === "" ? user.username : user.first_name}                
            </div>
            <div className={state.classname}>
                <div className="nav-dropdown-item">
                    Settings
                </div>
                <div className="nav-dropdown-item" onClick={handleLogout}>
                    Logout
                </div>            
            </div>
        </nav>
    )
}

export default Navbar
