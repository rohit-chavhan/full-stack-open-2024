import { useState } from 'react';

const Lists = ({ personRay }) => {
  return (
    <ul>
      {personRay.map((el, i) => (
        <li key={i}>{el.name}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const updateName = (event) => setNewName(event.target.value);

  const addElement = (event) => {
    event.preventDefault();
    const newObj = { name: newName };
    setPersons(persons.concat(newObj));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={updateName} value={newName} />
        </div>
        <div>
          <button onClick={addElement} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Lists personRay={persons} />
    </div>
  );
};

export default App;
