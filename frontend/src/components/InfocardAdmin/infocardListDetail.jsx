// React Imports
import React, { useContext, useState } from 'react'
// Additiona React Imports
// Local Imports
import {Input} from '../../utils'
import {AuthenticationContext, MetaContext} from '../../context'
// CSS Imports

const infocardListDetail = ({item}) => {
    // Context
    const {showError} = useContext(AuthenticationContext)
    const {meta, updateRecord} = useContext(MetaContext)
    // States
    const [state, setState] = useState(item ? item : meta.state)
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
    // Submit handler
    const submitHandler = (event) => {        
        event.preventDefault()
        const handleFrontend = (response, status) => {
            if(status === 200){
                // Handle Frontend
                console.log(response)
            }else{
                // Show Error
                showError(response)
            }
        }
        updateRecord(handleFrontend, state)
        // meta.crudHandler("UPDATE", handleFrontend, state)
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
                <div className="input-group d-flex align-center">
                    <button className="btn btn-login ml-auto" type="submit">Save Changes</button>
                </div>            
            </form>
        </div>
    )    
}

export default infocardListDetail
