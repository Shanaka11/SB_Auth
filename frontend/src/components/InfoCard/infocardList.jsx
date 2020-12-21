// React Imports
import React, { useState } from 'react'
// Additiona React Imports
// Local Imports
// CSS Imports

const infocardList = ({data, meta}) => {
    // Context
    // States
    const [state, setState] = useState({
        list: true,
        detail: false,
        item:{}
    })
    // Handle State Change
    // Submit handler
    // OnClick Handlers
    const handleOnClick = (event) => {
        // console.log(JSON.parse(event.target.getAttribute("data-item")))
        setState(prevValue => {
            return{
                ...prevValue,
                list: false,
                detail: true,
                item: JSON.parse(event.target.getAttribute("data-item"))
            }
        })
    }

    return (
        <div className="info-card-container-detail">
            <div className="d-flex info-card-list-heading">
                <button>New</button>
                {/* Deselect is also handled in this button */}
                <button>Select All</button>
                <button>Delete</button>
                <button>Search</button>
                <button>Zoom</button>
            </div>
            <hr/>
            {state.list && 
                <div className="info-card-list-row">
                {data.length > 0 && data.map((item, index) => {
                    return (
                            <div key={index} className="info-card-list-item" onClick={handleOnClick} data-item={JSON.stringify(item)}>
                                {item[name]}                    
                            </div>
                    )
                })}
                </div>
            }
            <div className="info-card-list-footer">
                {/* Add the pagination here */}
            </div>
        </div>
    )
}

export default infocardList
