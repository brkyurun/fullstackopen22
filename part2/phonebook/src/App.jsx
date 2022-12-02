import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
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

    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} already exists!`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
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
      <Persons persons={filter !== "" ? filtered : persons} />
    </div>
  );
};

export default App;
