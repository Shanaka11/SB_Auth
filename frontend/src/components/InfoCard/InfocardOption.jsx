// React Imports
import React, { useEffect, useState } from 'react'
// Additiona React Imports
// Local Imports
// CSS Imports

const InfocardOption = ({name, index, selected_id, selectItemHandler}) => {
    // Context    
    // States
    const [state, setState] = useState({
        selected_id: selected_id,
        className:  selected_id === index ? "info-card-subcat-selected" :"info-card-subcat"
    })
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
    
    useEffect(() => {
        if(selected_id === index){
            setState(prevValue => {
                return{
                    ...prevValue,
                    className: "info-card-subcat-selected"
                }
            })
        }else{
            setState(prevValue => {
                return{
                    ...prevValue,
                    className: "info-card-subcat"
                }
            })
        }
    },[selected_id])

    // Submit handler
    // OnClick Handlers
    const onClickHandler = (event) => {
        selectItemHandler(event)
    }
    return (
        <div className={state.className} data-index={index} onClick={onClickHandler}>
            {name}
        </div>
    )
}

export default InfocardOption
