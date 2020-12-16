// React Imports
import React, {useContext, useEffect, useState} from 'react'
// Additiona React Imports
import {useHistory} from 'react-router-dom'
// Local Imports
import {AuthenticationContext} from '../../context'
// CSS
import './navbar.css'

const Navbar = () => {

    // Context
    const {user, currentUser, logOut} = useContext(AuthenticationContext)
    const history = useHistory()

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

    const handleSettings = () => {
        history.push('/user/settings')
        const event = {
            "target": {
                "name": "classname",
                "value": "nav-dropdown-container hide"
            }
        }         
        handleChange(event)
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
            <div className="container d-flex">
                <div className="nav-user" onClick={handleDropdown}>
                    {user.first_name === "" ? user.username : user.first_name}
                    <div className={state.classname}>
                        <div className="nav-dropdown-item" onClick={handleSettings}>
                            Settings
                        </div>
                        <div className="nav-dropdown-item" onClick={handleLogout}>
                            Logout
                        </div>            
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
