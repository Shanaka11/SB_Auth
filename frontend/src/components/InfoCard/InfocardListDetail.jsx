// React Imports
import React from 'react'
// Additiona React Imports
// Local Imports
// CSS Imports

const InfocardListDetail = ({form, item, state}) => {
    // Context
    // States
    // Handle State Change
    // Submit handler
    // OnClick Handlers
    return (
        <>
        <h1>Detail</h1>
            {/* {card_detail && 
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
            }     */}
        </>  
    )
}

export default InfocardListDetail
