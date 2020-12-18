// React Imports
import React, { useContext, useState } from 'react'
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
                <button>Lov</button>
                <button>Zoom</button>
                <button>Back</button>
            </div>
            <hr/>
            {state.list && 
                <div className="info-card-list-row">
                {data.length > 0 && data.map((item, index) => {
                    return (
                            <div key={index} className="info-card-list-item" onClick={handleOnClick} data-item={JSON.stringify(item)}>
                                {item[meta.name]}                    
                            </div>
                    )
                })}
                </div>
            }
            {state.detail && 
                <InfocardListDetail item={state.item}/>
            }
            <div className="info-card-list-footer">
                {/* Add the pagination here */}
            </div>
        </div>
    )
}

export default InfocardList
