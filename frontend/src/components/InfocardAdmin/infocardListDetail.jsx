// React Imports
import React, { useContext, useState, useEffect } from 'react'
// Additiona React Imports
// Local Imports
import {Input} from '../../utils'
import {AuthenticationContext, MetaContext} from '../../context'
// CSS Imports

const infocardListDetail = ({item, action}) => {
    // action "UPDATE"/ "INSERT" / "DELETE"
    // Context
    const {showError} = useContext(AuthenticationContext)
    const {meta, addRecord, updateRecord} = useContext(MetaContext)
    // States
    const [state, setState] = useState(item ? {...meta.state, ...meta.read_only_state, ...item} : meta.state)

    // Handle State Change
    useEffect(()=>{
        // Change State acording to the action
        if (action === "INSERT"){
            setState({...meta.state, ...meta.read_only_state})
        }else if (action == "UPDATE"){
            setState({...item})
        }
        
    },[action])

    const handleChange = (event) => {
        const {name, value} = event.target
        setState(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    // Submit handler
    const submitHandler = (event) => {        
        event.preventDefault()
        const handleFrontend = (response, status) => {
            if(status === 200 || 201){
                // Handle Frontend
                console.log(response)
            }else{
                // Show Error
                showError(response)
            }
        }
        if(action === "INSERT"){
            addRecord(handleFrontend, state)
        }else if(action === "UPDATE"){
            updateRecord(handleFrontend, state)
        }
    }

    // OnClick Handlers
    return (
        <div className="info-card-container-detail">
            <form onSubmit={submitHandler}>
                {meta.form.fields.map((item, index) => {
                    return(
                            <div key={index} className="input-group">
                                <Input  type = {item.type}
                                        setFinalValue= {handleChange}
                                        name = {item.name}
                                        placeholder = {item.placeholder}
                                        initialValue = {state[item.name]} 
                                        reset = {item.reset} 
                                        required = {item.required}/>
                            </div> 
                    )
                })}
                {action === "INSERT" &&
                    meta.form.read_only_fields.map((item, index) => {
                        return(
                            <div key={index} className="input-group">
                                <Input  type = {item.type}
                                        setFinalValue= {handleChange}
                                        name = {item.name}
                                        placeholder = {item.placeholder}
                                        initialValue = {state[item.name]} 
                                        reset = {item.reset} 
                                        required = {item.required}/>
                            </div>                             
                        )
                    })}
                <div className="input-group d-flex align-center">
                    <button className="btn btn-login ml-auto" type="submit">Save Changes</button>
                </div>            
            </form>
        </div>
    )    
}

export default infocardListDetail
