import React from 'react'

const Part = ({id, name, exercises}) => {
    return (
        <p key={id}>{name} {exercises}</p>
    )
}

export default Part