import React from 'react'
import personService from "../services/persons"

const Person = ({id, name, number}) => {

    const personObject = { id: id, name: name, number: number }
    
    const deletePerson = event => {
        event.preventDefault();

        personService
        .deleteFromDb(id, personObject)
        .then(deletedPerson => {
            console.log('Poistettu')
          })
    }
    
    return (
        <p key={id}>
            {name} {number}
            <button onClick={deletePerson}>
                Poista
            </button>
        </p>
    )
}

export default Person