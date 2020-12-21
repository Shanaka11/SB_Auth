// React Imports
import React, {useState, useEffect} from 'react'
// Additiona React Imports
// Local Imports
// CSS Imports

const infocardOption = ({name, selected_name, selectItemHandler, index}) => {
    // Context
    // States
    const [state, setState] = useState({
        selected_name: selected_name,
        className:  selected_name === name ? "info-card-subcat-selected" :"info-card-subcat"
    })    
    // Handle State Change
    useEffect(() => {
        if(selected_name === name){
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
    },[selected_name])    
    // Submit handler
    // OnClick Handlers    
    const onClickHandler = (event) => {
        selectItemHandler(event)
    }

    return (
        <div className={state.className} data-name={name} data-index={index} onClick={onClickHandler}>
            {name}
        </div>
    )
}

export default infocardOption
