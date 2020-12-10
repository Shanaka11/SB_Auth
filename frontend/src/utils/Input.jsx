// React Imports
import React, {useState} from 'react'
// CSS Imports
import './utils.css';

const Input = ({type, setFinalValue, name, placeholder, initialValue, reset, required, pattern, patternText}) => { 

    const [value, setValue] = useState(reset === "TRUE" ? "" : (initialValue ? initialValue : ""))

    const handleOnChange = (event) =>{
        setValue(event.target.value)
    }

    const handleOnBlur = (event) => {
        setFinalValue(event)
    }

    const handleOnKeyPress = (event) => {
        if(event.keyCode === 13){
            setFinalValue(event)
        }
    }

    return (
        <div>
            {pattern ? 
            <input  className="input-control"
                    name={name} 
                    type={type} 
                    placeholder=" "
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyPress}
                    value={value}
                    onBlur={handleOnBlur}
                    step="any"
                    pattern= {pattern}
                    title= {patternText}
                    required={required ? "required" : ""}/>
            :
            <input  className="input-control"
                    name={name} 
                    type={type} 
                    placeholder=" "
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyPress}
                    value={value}
                    onBlur={handleOnBlur}
                    step="any"
                    required={required ? "required" : ""}/>
            }
            <label className="input-label" >{placeholder}</label>            
        </div>
    )
}

export default Input
