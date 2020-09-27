import React, { memo } from 'react'

const style = {
    // borderTop: '2px solid deepskyblue',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 1
}

const ButtonPanel = props => {
    const { togglePause, isPaused } = props

    return (
        <div className="btn-panel" style={style}>
            <button type="button" onClick={togglePause} className="btn btn-primary">
                {isPaused && 'PLAY'}
                {!isPaused && 'PAUSE'}
            </button>
            {/* <button type="button" className="btn btn-danger">
                RESTART
            </button> */}
        </div>
    )
}

export default memo(ButtonPanel)