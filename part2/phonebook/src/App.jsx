import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

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

  const unfilteredPeople = persons.map((person) => (
    <div key={person.id}>
      {person.name}: {person.number}
    </div>
  ));

  const filteredPeople = filtered.map((person) => (
    <div key={person.id}>
      {person.name}: {person.number}
    </div>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter !== "" ? filteredPeople : unfilteredPeople}
    </div>
  );
};

export default App;
