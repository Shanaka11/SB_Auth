import React, { useEffect, useState } from 'react'
import {apiGetUsers} from '../lookups'

const Admin = () => {

    // States
    const[state, setState] = useState({
        users: []
    })

    // Handle State Change
    const handleChange = (name, value) => {

        setState(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    /*useEffect(() => {
        const handleFrontend = (response, status) => {
            if (status === 200){
                console.log(response)
                handleChange('users', response)
            }else{
                console.log(error)
            }
        }
        apiGetUsers(handleFrontend)
    })*/

    return (
        <>
        <h1>Admin</h1>
        </>
    )
}

export default Admin
