import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    personService.getPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filteredNames = persons.filter((person) =>
      person.name.toLowerCase().startsWith(e.target.value)
    );
    setFiltered(filteredNames);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const nameExists = persons.some((person) => person.name === newName);
    if (
      nameExists &&
      confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const personId = persons.find((person) => person.name === newName).id;
      personService.updateNumber(personId, newPerson).then((updatedPerson) => {
        console.log(updatedPerson);
        setPersons(
          persons.map((person) =>
            person.name === newPerson.name
              ? { ...person, name: newName, number: newNumber }
              : person
          )
        );
        setNewName("");
        setNewNumber("");
      });
      return;
    } else if (!nameExists) {
      personService.addPerson(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDelete = (id) => {
    personService.deletePerson(id).then((response) => {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleFormSubmit}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filter !== "" ? filtered : persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
