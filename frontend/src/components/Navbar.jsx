// React Imports
import React, {useContext, useEffect} from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from '../context'
// CSS
import './components.css'

const Navbar = () => {

    // Context
    const {user, currentUser, logOut} = useContext(AuthenticationContext)

    // States
    // State Change
    // OnClick Handlers
    const handleLogout = (event) => {
        logOut()
    }
    // UseEffect
    useEffect(()=>{
        currentUser()
    }, [])

    return (
        <nav className="nav">
            <div className="nav-user" onClick={handleLogout}>
                {user.first_name === "" ? user.username : user.first_name}
            </div>            
        </nav>
    )
}

export default Navbar
