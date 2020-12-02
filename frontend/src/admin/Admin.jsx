// React
import React, { useEffect, useState } from 'react'
// Components
import {Navbar} from '../components'
// Lookups
import {} from '../lookups'
// Contexts

const Admin = () => {

    // States
    // const[state, setState] = useState({
    //     users: []
    // })

    // Handle State Change
    // const handleChange = (name, value) => {

    //     setState(prevValue => {
    //         return{
    //             ...prevValue,
    //             [name]: value
    //         }
    //     })
    // }

    return (
        <>
        <Navbar />
        <h1>Admin</h1>
        </>
    )
}

export default Admin
