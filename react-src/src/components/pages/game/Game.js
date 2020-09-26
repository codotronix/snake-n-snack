import React, { useEffect, useState } from 'react'
const rows = 15
const columns = 15
const boardWidth = window.innerWidth > 600 ? 600 : window.innerWidth
const cellWidth = boardWidth / rows

const createCells = () => {
    const cells = []
    for (let y = 1; y <= columns; y++) {
        for(let x = 1; x <= rows; x++) {
            let cell = { 
                x, y, 
                id: y + '-' + 1,
                top: (y-1)*cellWidth,
                left: (x-1)*cellWidth
            }
            cells.push(cell)
        }
    }
    return cells
}


const Game = props => {
    const [cells, setCells] = useState(createCells())

    return (
        <div className="board" style={{width: boardWidth}}>
            {
                cells.map(c => 
                <div 
                    data-id={c.id}
                    key={c.id} 
                    style={{
                        top: c.top, 
                        left: c.left, 
                        width: cellWidth, 
                        height: cellWidth
                    }} 
                    className="cell"
                ></div>)
            }
        </div>
    )
}

export default Game