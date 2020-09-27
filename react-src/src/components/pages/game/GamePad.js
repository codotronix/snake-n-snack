import React, { memo } from 'react'

const GamePad = props => {
    const { moveUp, moveDown, moveLeft, moveRight } = props

    const handleClick = (e, fn) => {
        e.stopPropagation()
        fn()
    }

    return (
        <div className="gamepad">
            <div className="group left">
                <i className="fas fa-chevron-up up ico" 
                    onClick={e => handleClick(e, moveUp)} 
                    onTouchEnd={e => handleClick(e, moveUp)}
                ></i>
                <i className="fas fa-chevron-left left ico" 
                    onClick={e => handleClick(e, moveLeft)} 
                    onTouchEnd={e => handleClick(e, moveLeft)}
                ></i>
                <i className="fas fa-chevron-down down ico" 
                    onClick={e => handleClick(e, moveDown)} 
                    onTouchEnd={e => handleClick(e, moveDown)}
                ></i>
            </div>
            
            <div className="group right">
                <i className="fas fa-chevron-up up ico" 
                    onClick={e => handleClick(e, moveUp)} 
                    onTouchEnd={e => handleClick(e, moveUp)}
                ></i>
                <i className="fas fa-chevron-right right ico" 
                    onClick={e => handleClick(e, moveRight)} 
                    onTouchEnd={e => handleClick(e, moveRight)}
                ></i>
                <i className="fas fa-chevron-down down ico" 
                    onClick={e => handleClick(e, moveDown)} 
                    onTouchEnd={e => handleClick(e, moveDown)}
                ></i>
            </div>
        </div>
    )
} 

export default memo(GamePad)