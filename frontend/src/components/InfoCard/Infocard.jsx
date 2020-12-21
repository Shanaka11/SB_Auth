// React Imports
import React, {useState} from 'react'
// Additiona React Imports
import InfoCardOption from './InfocardOption'
import InfoCardDetail from './InfocardDetail'
import InfocardList from './infocardList'
// Local Imports
// CSS Imports
import './infocard.css';

const Infocard = ({card, list, form, name}) => {
    // Context
    // States
    const [state, setState] = useState({
        selected_id: 0
    })
    // Handle State Change
    // Submit handler
    // OnClick Handlers
    const selectItemHandler = (event) => {
        setState(prevValue => {
            return{
                ...prevValue,
                selected_id: parseInt(event.target.getAttribute("data-index"))
            }
        })
    }

    return (
        <div className="info-card-container grid-1-5">
            <div>
                {card.map((item, index) =>{
                    return (
                        <InfoCardOption key={index} name={item.name} index={index} selected_id={state.selected_id} selectItemHandler={selectItemHandler}/>
                    )
                })}
            </div>
            {card && form &&
                <InfoCardDetail card_detail={card[state.selected_id].contents}/>
            }
        </div>        
    )
}

export default Infocard
