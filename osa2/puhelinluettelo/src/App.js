import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { id: "Arto Hellas", name: "Arto Hellas", number: "040-123456" },
    { id: "Martti Tienari", name: "Martti Tienari", number: "040-123456" },
    { id: "Arto Järvinen", name: "Arto Järvinen", number: "040-123456" },
    { id: "Lea Kutvonen", name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  const addPerson = event => {
    event.preventDefault();

    var findExisting = persons.filter(function(f) {
      return f.id === newName;
    });

    if (findExisting.length < 1) {
      const personObject = {
        id: newName,
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
    } else {
      window.alert(`${newName} on jo luettelossa!`);
    }

    setNewName("");
    setNewNumber("");
    setPersonsToShow(persons);
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
