// React Imports
import React, { useContext, useEffect, useState } from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from '../context'
import {InfoCard} from '../components'
// CSS Imports

const UserSettings = () => {
    // Context
    const {user, updateUser, updateUserPassword} = useContext(AuthenticationContext)
    // States
    const [state, setState] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password1:"",
        password2:""
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

    useEffect(() => {
        setState(prevValue => {
            return{
                ...prevValue,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }
        })        
    }, [user])
    // Submit handlers
    const handleSubmitUser = (event) => {
        event.preventDefault()
        const data = {
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email
        }
        updateUser(user.id, data)
    }

    const handleSubmitPassword = (event) => {
        event.preventDefault()
        const data ={
            username: user.username,
            password1: state.password1,
            password2: state.password2
        }
        updateUserPassword(data)
    }

    // console.log(user)
    // OnClick Handlers
    const card = [
                    {
                        "id": 0,
                        "name": "User Details",
                        "contents":[
                            // Form
                            {
                                "submitHandler": handleSubmitUser,
                                "fields": [ 
                                        {
                                        "type":"text",
                                        "setFinalValue": handleChange,
                                        "name": "first_name",
                                        "placeholder": "First Name",
                                        "initialValue": state.first_name,
                                        "reset": "FALSE",
                                        "required": false
                                    },
                                    {
                                        "type":"text",
                                        "setFinalValue": handleChange,
                                        "name": "last_name",
                                        "placeholder": "Last Name",
                                        "initialValue": state.last_name,
                                        "reset": "FALSE",
                                        "required": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "Email & Password",
                        "contents":[
                            // Form1
                            {
                                "submitHandler": handleSubmitUser,
                                "fields": [
                                    {
                                        "type":"email",
                                        "setFinalValue": handleChange,
                                        "name": "email",
                                        "placeholder": "Email",
                                        "initialValue": state.email,
                                        "reset": "FALSE",
                                        "required": true
                                    }
                                ]
                            },
                            // Form2
                            {
                                "submitHandler": handleSubmitPassword,
                                "fields": [
                                    {
                                        "type":"password",
                                        "setFinalValue": handleChange,
                                        "name": "password1",
                                        "placeholder": "Password",
                                        "initialValue": state.password1,
                                        "reset": "FALSE",
                                        "required": true
                                    }, 
                                    {
                                        "type":"password",
                                        "setFinalValue": handleChange,
                                        "name": "password2",
                                        "placeholder": "Confirm Password",
                                        "initialValue": state.password2,
                                        "reset": "FALSE",
                                        "required": true
                                    },                                    
                                ]                                
                            }
                        ]
                    },                      
                ]

    return (
        <div className="container">
            <h1>Settings</h1>
            <InfoCard card={card}/>
        </div>
    )
}

export default UserSettings
