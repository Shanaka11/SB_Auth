import React, { createContext, useReducer } from "react"
import AuthenticationReducer from "./AuthenticationReducer"
import {apiLogin, apiLogout, ApiLoggedUser, logged, ApiRegisterUser, ApiResetPasswordReq, ApiResetPassword} from "../lookups"

// Initial State
const initialState = {
    logged: logged() ? true : false,
    user: {},
    role: "",
    email: "",
    salesperson_id: "",
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
                alert(JSON.stringify(response))
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
    const activateUserReq = (user, callback) => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }
    }
    
    // Activate User
    const activateUser = (token, callback) => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                callback()
            }else{
                alert(JSON.stringify(response))                
            }
        }
    }

    const updateUser = (data) => {

        const handleFrontend = (response, state) => {
            
        }

        //ApiUpdateUser(handleFrontend, data)
    }

    return (
        <AuthenticationContext.Provider
            value = {
                {
                    logged: state.logged,
                    user: state.user,
                    // role: state.role,
                    logIn,
                    logOut,
                    currentUser,
                    register,
                    resetPasswordReq,
                    resetPassword,
                    // registerAdmin,
                    // updateUser
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
}