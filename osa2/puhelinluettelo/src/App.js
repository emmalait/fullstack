import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])
 
  const addPerson = event => {
    event.preventDefault();

    var findExisting = persons.filter(function(f) {
      return f.name === newName;
    });

    if (findExisting.length < 1) {
      const personObject = {
        name: newName,
        number: newNumber
      };
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(personsToShow.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          
        })
    } else {
      window.alert(`${newName} on jo luettelossa!`);
    }

  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handlePersonsToShowChange = event => {
    setNewSearch(event.target.value);
    
    const findSearched = persons.filter(function(f) {
      return f.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setPersonsToShow(findSearched);
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter newSearch={newSearch} handlePersonsToShowChange={handlePersonsToShowChange}/>

      <h3>Lisää uusi</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} /> 
      
      <h2>Numerot</h2>

      <Persons personsToShow={personsToShow} />

    </div>
  );
};

export default App;
