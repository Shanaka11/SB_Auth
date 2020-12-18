// React Imports
import React, { useContext, useEffect, useState } from 'react'
// Additiona React Imports
// Local Imports
import {AuthenticationContext} from "../context"
import {apiGetUsers} from '../lookups'
import {InfoCardAdmin} from '../components'
import Meta from './modules'
import {MetaProvider} from '../context'
// CSS Imports

const Admin = () => {
    // Context
    // const {showError} = useContext(AuthenticationContext)
    // States
    // const [state, setState] = useState({
    //     component: "",
    //     data: [],
    //     meta: {},
    //     options:['user', 'test']
    //     // labels: [],
    //     // form:{},
    //     // name: ""
    // })
    // Handle State Change
    // const handleChange = (component, response) => {
    //     setState(prevValue => {
    //         return{
    //             ...prevValue,
    //             component: component,
    //             data: response,
    //             // labels:[],
    //             meta: Meta.components[component]
    //             // form:Meta.components[component].form,
    //             // name: Meta.components[component].name // This is the attribute that will be displayed in the list
    //         }
    //     })
    // }

    
    // This will handle Insert, Update, Delete, Bulk Delete functionalities
    // const submitHandler = (component, operation, data) => {
    //     // Valid values for operation
    //     //  Look for relevent apis in the Component JS file
    //     // 'INSERT', 'UPDATE', 'DELETE', 'BDELETE'
    //     console.log("submit")
    // }

    // useEffect(() => {      
    //     // Load All Users in the first attempt rest of Data (Other Components) should be loaded when they are selected from the info card
    //     const handleFrontend = (response, status) => {
    //         if(status === 200){
    //             handleChange("user", response)
    //         }else{
    //             showError(response)
    //         }
    //     }

    //     apiGetUsers(handleFrontend)

    // },[])


    return (
        <div className="container">        
            <h1>Admin Console</h1>
            {/* {<InfoCard card={state.data} list meta={state.meta}/>} */}
            <MetaProvider>
                <InfoCardAdmin list/>
            </MetaProvider>
        </div>
    )
}

export default Admin
