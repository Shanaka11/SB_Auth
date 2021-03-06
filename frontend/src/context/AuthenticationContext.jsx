import React, { createContext, useReducer } from "react"
import AuthenticationReducer from "./AuthenticationReducer"
import {apiLogin, apiLogout, ApiLoggedUser, logged, ApiRegisterUser, ApiResetPasswordReq, ApiResetPassword, getLoggedUserInfo, ApiSendActivationLink, ApiActivate, ApiUpdateUser, ApiUpdatePassword} from "../lookups"

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

    // Error Handler

    const HandleError = (response) => {
        // Might need to decode the response first        
        dispatch({
            type: 'MESSAGE',
            payload: {
                        "type": "ERROR",
                        "response": response === null ? {"message" : "Server Error Occured"} : response
                    }
        })

        setTimeout(() =>{dispatch({
            type: 'MESSAGE',
            payload: ""
        })}, 10000);
    }

    // Actions
    const register = (callback, data) => {
        const handleFrontend = (response, status) => {
            if(status == 201){
                callback()
            }else{
                HandleError(response)
                // alert(JSON.stringify(response))
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
                HandleError(response)
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
                HandleError(response)
                // alert(JSON.stringify(response))
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
                // alert(JSON.stringify(response))                
                logOut()
                HandleError(response)
            }
        }

        ApiLoggedUser(handleFrontend)

    }

    const resetPasswordReq = (callback, data) => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                callback()
            }else{
                HandleError(response)
                // alert(JSON.stringify(response))                
            }
        }
        
        ApiResetPasswordReq(handleFrontend, data)
    }

    const resetPassword = (user, token, callback, data) => {

        const handleFrontend = (response, status) => {
            if(status === 201){
                callback()
            }else{
                HandleError(response)
                // alert(JSON.stringify(response))                
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
                HandleError(response)
                // alert(JSON.stringify(response))                
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
                HandleError(response)
                // alert(JSON.stringify(response))                
            }
        }

        ApiActivate(token, handleFrontend)
    }

    const updateUser = (id, data) => {

        const handleFrontend = (response, state) => {
            if(state === 200){
                dispatch({
                    type: 'UPDATE',
                    payload: response
                })
            }else{
                HandleError(response)
            }
        }
        ApiUpdateUser(id, handleFrontend, data)
    }

    const updateUserPassword = (data) => {
        
        const handleFontend = (response, status) => {
            if(status === 201){
                dispatch({
                    type: 'UPDATE',
                    payload: response
                })
            }else{
                HandleError(response)
            }
        }

        ApiUpdatePassword(handleFontend, data)        
    }

    // Clear Messages
    const clearMessage = () => {
        dispatch({
            type: 'CLEAR_MESSAGE',
            payload: ""
        })        
    }

    // Show Error
    const showError = (message) => {
        dispatch({
            type: 'ERROR',
            payload: message
        })
    }
    // Show Success message

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
                    clearMessage,
                    updateUserPassword,
                    // registerAdmin,
                    updateUser,
                    showError
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
}