const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
          <button type="button" onClick={() => handleDelete(person.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
