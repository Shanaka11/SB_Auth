// React Imports
import React, { useContext, useEffect, useState } from 'react'
// Additiona React Imports
// Local Imports
import InfocardListDetail from './InfocardListDetail'
import {MetaContext} from '../../context'
// CSS Imports

const InfocardList = () => {
    // Context
    const { meta, data } = useContext(MetaContext)        
    // States
    const [state, setState] = useState({
        item:{},
        action:"LIST",
    })    
    // Submit handler
    // OnClick Handlers
    const handleOnClick = (event) => {
        setState(prevValue => {
            return{
                ...prevValue,
                action: event.target.getAttribute("data-action"),
            }
        })        
    }

    const handleOnClickListItem = (event) => {
        setState(prevValue => {
            return{
                ...prevValue,
                action: "UPDATE",
                item: JSON.parse(event.target.getAttribute("data-item"))
            }
        })
    }    

    return (
        <div className="info-card-container-detail">
            <div className="d-flex info-card-list-heading">
                <button onClick={handleOnClick} data-action="INSERT" >New</button>
                {/* Deselect is also handled in this button */}
                <button>Select All</button>
                <button>Delete</button>
                <button>Search</button>
                <button>Lov</button>
                <button>Zoom</button>
                <button>Back</button>
            </div>
            <hr/>
            {state.action === "LIST" && 
                <div className="info-card-list-row">
                {data.length > 0 && data.map((item, index) => {
                    return (
                            <div key={index} className="info-card-list-item" onClick={handleOnClickListItem} data-item={JSON.stringify(item)}>
                                {item[meta.name]}                    
                            </div>
                    )
                })}
                </div>
            }
            {state.action !== ("LIST" || "") && 
                <InfocardListDetail item={state.item} action={state.action}/>
            }
            <div className="info-card-list-footer">
                {/* Add the pagination here */}
            </div>
        </div>
    )
}

export default InfocardList
