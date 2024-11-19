import { useState } from 'react';

const Lists = (prop) => {
  return (
    <ul>
      {prop.obj.map((el, i) => (
        <li key={i}>
          {el.name} {el.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '345567' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState(91);

  const updateName = (event) => setNewName(event.target.value);
  const updateNums = (event) => setNewNum(event.target.value);

  const addElement = (event) => {
    event.preventDefault();
    const newObj = { name: newName, number: newNum };
    let getBoolean = persons.some(
      (el) => JSON.stringify(el) === JSON.stringify(newObj)
    );

    if (getBoolean) {
      alert(`${newObj.name} already added to phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewName('');
      setNewNum(91);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={updateName} value={newName} />
        </div>
        <div>
          number: <input onChange={updateNums} value={newNum} />
        </div>
        <div>
          <button onClick={addElement} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Lists obj={persons} />
    </div>
  );
};

export default App;
