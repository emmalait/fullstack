import React from 'react'
import Person from "./Person";


const Persons = ({personsToShow}) => {    
    const rows = () =>
    personsToShow.map(person => (
      <div>
        <Person id={person.id} name={person.name} number={person.number} key={person.id} />
      </div>
    ));

    return (
        rows()
    )
}

export default Persons;