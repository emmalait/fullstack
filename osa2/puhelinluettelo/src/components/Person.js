import React from 'react'
import Notification from "./Notification"
import personService from "../services/persons"

const Person = ({id, name, number, setErrorMessage}) => {

    const personObject = { id: id, name: name, number: number }

    const deletePerson = event => {
        event.preventDefault();
    
        if (window.confirm(`Haluatko varmasti poistaa henkilön ${name}?`)) { 
            personService
                .deleteFromDb(id, personObject)
                .then(deletedPerson => {
                    console.log('Poistettu')
                    setErrorMessage(
                        `Henkilö ${personObject.name} poistettiin palvelimelta`
                      )
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)
                
                })
          }
    
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