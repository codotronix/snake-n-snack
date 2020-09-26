import React, { useEffect, useReducer, useState } from 'react'
import clsx from 'clsx'
import _ from 'lodash'

const rows = 15
const columns = 15
const boardWidth = window.innerWidth > 600 ? 600 : window.innerWidth
const cellWidth = boardWidth / rows
const snakeHead = '7-7' // let a mid cell be the head
const frequency = 700  // 1 move per frequency ms

const actionTypes = {
    CHANGE_DIRECTION: "CHANGE_DIRECTION",
    MOVE: "MOVE"
}

/**
 * The board will consists of rows*columns number of cells 
 * where the snake can move to
 */
const cells = (() => {
    const cells = {}
    for (let y = 1; y <= columns; y++) {
        for(let x = 1; x <= rows; x++) {
            const id = y + '-' + x
            let cell = { 
                x, y, id,
                top: (y-1)*cellWidth,
                left: (x-1)*cellWidth
            }
            cells[id] = cell
        }
    }
    return cells
})()

const DIRECTION = {
    LEFT: 'left', RIGHT: 'right', UP: 'up', DOWN: 'down'
}

// NO BACK TURN
const ALLOWED_TURNS = {
    [DIRECTION.LEFT]: [DIRECTION.UP, DIRECTION.DOWN],
    [DIRECTION.RIGHT]: [DIRECTION.UP, DIRECTION.DOWN],
    [DIRECTION.UP]: [DIRECTION.LEFT, DIRECTION.RIGHT],
    [DIRECTION.DOWN]: [DIRECTION.LEFT, DIRECTION.RIGHT]
}

const initState = {
    snake: [snakeHead, '7-8', '7-9'],
    direction: DIRECTION.RIGHT
}

/**
 * Reducer function for useReducer hook
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case actionTypes.CHANGE_DIRECTION: {
            return {
                ...state,
                direction: payload
            }
            break
        }
        case actionTypes.MOVE: {
            const headCell = cells[state.snake[0]]
            let { x, y } = headCell
            const { direction } = state

            if (direction === DIRECTION.LEFT) {
                x = x > 1 ? --x : rows
            }
            else if (direction === DIRECTION.RIGHT) {
                x = x < rows ? ++x : 1
            }
            else if (direction === DIRECTION.UP) {
                y = y > 1 ? --y : columns
            }
            else if (direction === DIRECTION.DOWN) {
                y = y < columns ? ++y : 1
            }

            const newHeadCellID = y + '-' + x
            const newSnake = [...state.snake]

            // remove 1 snake-body from end of array
            // and add newHead at the begining of array
            newSnake.pop()
            newSnake.unshift(newHeadCellID)

            return {
                ...state,
                snake: newSnake
            }
        }
    }
}


const Game = props => {
    const [gameState, dispatch] = useReducer(reducer, initState)

    const gameLoop = () => {
        dispatch({ type: actionTypes.MOVE })
        setTimeout(gameLoop, frequency)
    }

    useEffect(() => {
        gameLoop()
    }, [])

    /**
     * When player clicks on direction button,
     * Check if that direction is allowed,
     * then Dispatch it...
     * 
     * Debounce this function call
     * @param {*} direction 
     */
    const move = _.debounce(direction => {
        // check if requested trun is allowed
        if(ALLOWED_TURNS[gameState.direction].includes(direction)) {
            dispatch({ 
                type: actionTypes.CHANGE_DIRECTION,
                payload: direction
            })
        }
    }, 1000)

    return (
        <div className="board" style={{width: boardWidth}}>
            {
                Object.values(cells).map(c => 
                <div 
                    data-id={c.id}
                    key={c.id} 
                    style={{
                        top: c.top, 
                        left: c.left, 
                        width: cellWidth, 
                        height: cellWidth
                    }} 
                    className={clsx(
                        'cell', 
                        gameState.snake.includes(c.id) && 'snake-body',
                        gameState.snake[0] === c.id && 'snake-head'
                    )}
                ></div>)
            }
        </div>
    )
}

export default Game