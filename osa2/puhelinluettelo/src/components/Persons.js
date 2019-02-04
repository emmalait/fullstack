import React from 'react'
import Person from "./Person";

const Persons = ({personsToShow}) => {
    const rows = () =>
    personsToShow.map(person => (
      <Person key={person.id} name={person.name} number={person.number} />
    ));

    return (
        rows()
    )
}

export default Persons;