import React from 'react'
import { Button } from './Button'

export const Header = ({ title, onAdd, showAdd }) => {

    return (
        <div className="header">
            <h1>{title}</h1>
            <Button color={showAdd?'red':'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}