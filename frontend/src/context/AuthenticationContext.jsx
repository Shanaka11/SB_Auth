import React, { createContext, useReducer } from "react"
import AuthenticationReducer from "./AuthenticationReducer"
import {apiLogin, apiLogout, ApiLoggedUser, logged} from "../lookups"

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
        ApiRegisterUser(callback, data)
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
        apiLogout()
    }

    const currentUser = () => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                console.log(response)
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
                    // salesperson_id: state.salesperson_id,
                    // email: state.email,
                    logIn,
                    // logOut,
                    currentUser
                    // register,
                    // registerAdmin,
                    // updateUser
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
}