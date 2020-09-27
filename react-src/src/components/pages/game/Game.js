import React, { useEffect, useReducer, useCallback } from 'react'
import clsx from 'clsx'
import _ from 'lodash'
import GamePad from './GamePad'
import ButtonPanel from './ButtonPanel'

const rows = 15
const columns = 18
const boardWidth = window.innerWidth > 600 ? 600 : window.innerWidth
const cellWidth = boardWidth / rows
const boardHeight = cellWidth * columns
const snakeHead = '7-7' // let a mid cell be the head
const frequency = 700  // 1 move per frequency ms

const actionTypes = {
    CHANGE_DIRECTION: "CHANGE_DIRECTION",
    MOVE: "MOVE",
    TOGGLE_PAUSE: "TOGGLE_PAUSE"
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
    snake: [snakeHead, '7-6', '7-5'],
    direction: DIRECTION.RIGHT,
    food: '3-5',
    isAlive: true,
    isPaused: false,
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
            if(!state.isAlive || state.isPaused) return state
            return {
                ...state,
                direction: payload
            }
        }
        case actionTypes.MOVE: {
            if(!state.isAlive || state.isPaused) return state
            const headCell = cells[state.snake[0]]
            let { x, y } = headCell
            let { direction, food } = state

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

            // Death Check
            if(newSnake.includes(newHeadCellID)) {
                alert('Hey you KILLED the snake :P ')
                return {
                    ...state,
                    isAlive: false
                }
            }

            // remove 1 snake-body from end of array
            // but dont remove if it is a Food, let it grow...
            // and add newHead at the begining of array
            if(newHeadCellID === food) {
                food = ''   // need to create a food here
                food = getAnEmptyCellID(Object.keys(cells), newSnake)
            }
            else {
                newSnake.pop()
            }
            
            newSnake.unshift(newHeadCellID)

            return {
                ...state,
                snake: newSnake,
                food
            }
        }
        case actionTypes.TOGGLE_PAUSE: {
            return {
                ...state,
                isPaused: !state.isPaused
            }
        }
        default: 
            return state
    }
}

/**
 * This function will receive 2 arrays and it has to give
 * any 1 value that is in 1st array but not in 2nd array
 * @param {string[]} allCells | array of IDs
 * @param {string[]} occupiedCells | array of IDs
 */
function getAnEmptyCellID (allCells, occupiedCells) {
    let emptyID = ''

    do {
        let randomIndex = Math.floor(Math.random() * allCells.length)
        emptyID = allCells[randomIndex]
    } 
    while(occupiedCells.includes(emptyID))

    return emptyID
}


const Game = props => {
    const [gameState, dispatch] = useReducer(reducer, initState)

    const gameLoop = useCallback(() => {
        if(!gameState.isAlive) return
        dispatch({ type: actionTypes.MOVE })
        setTimeout(gameLoop, frequency)
    }, [gameState.isAlive])

    useEffect(() => {
        gameLoop()
    }, [gameLoop])

    /**
     * When player clicks on direction button,
     * Check if that direction is allowed,
     * then Dispatch it...
     * 
     * Debounce this function call
     * @param {*} direction 
     */
    const move = _.throttle(direction => {
        // check if requested trun is allowed
        if(ALLOWED_TURNS[gameState.direction].includes(direction)) {
            dispatch({ 
                type: actionTypes.CHANGE_DIRECTION,
                payload: direction
            })
        }
    }, frequency)

    const moveUp = () => move(DIRECTION.UP)
    const moveDown = () => move(DIRECTION.DOWN)
    const moveLeft = () => move(DIRECTION.LEFT)
    const moveRight = () => move(DIRECTION.RIGHT)
    const togglePause = () => dispatch({ type: actionTypes.TOGGLE_PAUSE })

    return (
        <div className="gamepage">
            <div className="board" 
                style={{ width: boardWidth, height: boardHeight }}
                onClick={togglePause}
            >
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
                            gameState.snake[0] === c.id && 'snake-head',
                            gameState.food === c.id && 'food'
                        )}
                    ></div>)
                }
                
                <GamePad 
                    moveUp={moveUp}
                    moveDown={moveDown}
                    moveLeft={moveLeft}
                    moveRight={moveRight}
                />
                <span className="status">Snake Size: {gameState.snake.length}</span>
            </div>
            <ButtonPanel 
                togglePause={togglePause}
                isPaused={gameState.isPaused}
            />
        </div>
    )
}

export default Game