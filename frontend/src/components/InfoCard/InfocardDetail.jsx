// React Imports
import React, {useState} from 'react'
// Additiona React Imports
import {Input} from '../../utils'
// Local Imports
// CSS Imports

const InfocardDetail = ({card_detail}) => {
    // Context
    // States
    // Handle State Change
    // Submit handler
    // OnClick Handlers
    return (
        <>
            {card_detail && 
                <div className="info-card-container-detail">
                    {card_detail.map((form, index) => {
                        return (
                            <form key={index} onSubmit={form.submitHandler}>
                                {form.fields.map((item, index) => {
                                    return (                
                                        <div key={index} className="input-group">
                                            <Input  type = {item.type}
                                                    setFinalValue= {item.setFinalValue}
                                                    name = {item.name}
                                                    placeholder = {item.placeholder}
                                                    initialValue = {item.initialValue} 
                                                    reset = {item.reset} 
                                                    required = {item.required}
                                                    item = {item}/>
                                        </div> 
                                    )
                                })}               
                                <div className="input-group d-flex align-center">
                                    <button className="btn btn-login ml-auto" type="submit">Save Changes</button>
                                </div>
                            </form>
                        )
                    })}
                </div>
            }    
        </>        
    )
}

export default InfocardDetail
