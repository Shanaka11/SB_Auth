// React Imports
import React, {useEffect, useState, useContext} from 'react'
// Additiona React Imports
// Local Imports
import InfoCardOption from './InfocardOption'
// import InfoCardDetail from './InfocardDetail'
import InfocardList from './infocardList'
import {MetaContext} from '../../context'
// CSS Imports
import '../InfoCard/infocard.css';

const Infocard = ({form, list}) => {
    // Context
    const { options, changeModule} = useContext(MetaContext)
    // States
    const [state, setState] = useState({
        selected_name: options[0],
        selected_id: 0
    })    
    // Handle State Change
    useEffect(() => {
        changeModule(options[state.selected_id])

    }, [state.selected_id])

    // Submit handler
    // OnClick Handlers
    const selectItemHandler = (event) => {
        setState(prevValue => {
            return{
                ...prevValue,
                selected_name: event.target.getAttribute("data-name"),
                selected_id: event.target.getAttribute("data-index")
            }
        })
    }

    return (
        <div className="info-card-container grid-1-5">
            <div>
                {options.map((item, index) =>{
                    return (
                        <InfoCardOption key={index} name={item} selected_name={state.selected_name} index={index} selectItemHandler={selectItemHandler}/>
                    )
                })}
            </div>
            {/* {card && form &&
                <InfoCardDetail card_detail={card[state.selected_id].contents}/>
            } */}
            {list &&
                <InfocardList/>
            }
        </div>
    )
}

export default Infocard
