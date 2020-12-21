import React, { createContext, useReducer } from "react"
import MetaReducer from "./MetaReducer"
import Meta, { meta } from '../admin/modules'

// Initial State
const initialState = {
    component: "",
    data: [],
    meta: {},
    options:['user']    
}

// Create Context
export const MetaContext = createContext(initialState)


// Provider Component
export const MetaProvider = ({children}) => {
    const [state, dispatch] = useReducer(MetaReducer, initialState)

    // Actions
    // Change Module
    const changeModule = (component, callback) => {

        const handleFrontend = (response, status) => {
            if(status === 200){
                dispatch({
                    type: 'GET_ALL',
                    payload: {
                                component: component,
                                data: response,
                                meta: meta.components[component]
                            }
                })
            }else{
                // Handle Error
                callback(response)
            }
        }
        meta.components[component].crudHandle('GET_LIST', handleFrontend)
    }

    // Insert
    const addRecord = (callback, data) => {
        const handleFrontend = (response, status) => {
            if(status === 201){
                dispatch({
                    type: 'INSERT',
                    payload: {
                                item: response
                            }
                })
            }else{
                // Handle Error
                callback(response)
            }
        }
        meta.components[state.component].crudHandle('INSERT', handleFrontend, data)
    }

    // Update
    const updateRecord = (callback, data) => {
        const handleFrontend = (response, status) => {
            if(status === 200){
                dispatch({
                    type: 'UPDATE',                    
                    payload: {
                                item: response,
                            }
                })
            }else{
                // Handle Error
                callback(response)
            }
        }        
        meta.components[state.component].crudHandle('UPDATE', handleFrontend, data)
    }
    // Delete    
    const deleteRecord = () => {

    }

    return (
        <MetaContext.Provider
            value = {
                {
                    // State
                    options: state.options,
                    component : state.component,
                    meta: state.meta,
                    data: state.data,
                    // Actions
                    changeModule,
                    addRecord,
                    updateRecord,
                    deleteRecord
                }
            }
        >
            {children}
        </MetaContext.Provider>
    )
}