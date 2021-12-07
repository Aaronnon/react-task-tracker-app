import React from 'react'
import { Button } from './Button'

export const BtnAdd = ({showAdd,onAdd}) => {
    return (
        <div className='btn-possition'>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </div>
    )
}
