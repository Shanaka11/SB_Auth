import React, { createContext, useReducer } from "react"
import AuthenticationReducer from "./AuthenticationReducer"
import {apiLogin, apiLogout, ApiLoggedUser, logged, ApiRegisterUser, ApiResetPasswordReq, ApiResetPassword, getLoggedUserInfo, ApiSendActivationLink, ApiActivate} from "../lookups"

// Initial State
const initialState = {
    logged: logged() ? true : false,
    user: getLoggedUserInfo(),
    role: "",
    message: ""
}

// Create Context
export const AuthenticationContext = createContext(initialState)

// Provider Component
export const AuthenticationProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthenticationReducer, initialState)

    // Actions
    const register = (callback, data) => {
        const handleFrontend = (response, status) => {
            if(status == 201){
                callback()
            }else{
                alert(JSON.stringify(response))
            }
        }
        ApiRegisterUser(handleFrontend, data)
    }

    const registerAdmin = (callback, data) =>{
        ApiRegisterAdmin(callback, data)
    }

    const logIn = (data) => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                dispatch({
                    type: 'LOGIN',
                    payload: response
                })
            }else{
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                                "type": "ERROR",
                                "response": response
                            }
                })
                // alert(JSON.stringify(response))
            }
        }
        apiLogin(handleFrontend, data)
    }

    const logOut = () => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                dispatch({
                    type: 'LOGOUT'
                })
            }else{
                alert(JSON.stringify(response))
            }
        }        
        apiLogout(handleFrontend)
    }

    const currentUser = () => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                if (response !== null) {
                    dispatch({
                        type: 'USER',
                        payload: response
                    })
                }
            }else{
                alert(JSON.stringify(response))
                logOut()
            }
        }

        ApiLoggedUser(handleFrontend)

    }

    const resetPasswordReq = (callback, data) => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }
        
        ApiResetPasswordReq(handleFrontend, data)
    }

    const resetPassword = (user, token, callback, data) => {

        const handleFrontend = (response, status) => {
            if(status === 201){
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }

        ApiResetPassword(user, token, handleFrontend, data)
    }

    // Request Activation Link
    const activateUserReq = (callback) => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }
        ApiSendActivationLink(callback)        
    }
    
    // Activate User
    const activateUser = (token, callback) => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                dispatch({
                    type: 'ACTIVATE',
                    payload: response
                })
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }

        ApiActivate(token, handleFrontend)
    }

    const updateUser = (data) => {

        const handleFrontend = (response, state) => {
            
        }

        //ApiUpdateUser(handleFrontend, data)
    }

    // Clear Messages
    const clearMessage = () => {
        dispatch({
            type: 'CLEAR_MESSAGE',
            payload: ""
        })
    }

    return (
        <AuthenticationContext.Provider
            value = {
                {
                    logged: state.logged,
                    user: state.user,
                    // role: state.role,
                    message: state.message,
                    logIn,
                    logOut,
                    currentUser,
                    register,
                    resetPasswordReq,
                    resetPassword,
                    activateUserReq,
                    activateUser,
                    clearMessage
                    // registerAdmin,
                    // updateUser
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
}