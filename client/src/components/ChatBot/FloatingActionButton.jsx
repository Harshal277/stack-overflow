import React from 'react'
import './FloatingActionButton.css'

import { SiGooglemessages } from 'react-icons/si'
import { GrClose } from 'react-icons/gr'

const FloatingActionButton = ( {ShowHideBot, setShowHideBot} ) => {
    return (
    <div>
        <button className={ ShowHideBot ? 'floatBtn' : 'floatBtn activeBtn' } onClick={() => setShowHideBot(!ShowHideBot)}>
            {
                ShowHideBot ? <SiGooglemessages /> : <GrClose /> 
            }
        </button>
    </div>
  )
}

export default FloatingActionButton