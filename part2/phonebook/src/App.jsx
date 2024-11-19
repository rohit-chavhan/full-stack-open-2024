import { useState } from 'react';
import Lists from './components/Lists';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');

  const [search, setSearch] = useState('');
  const [find, setFind] = useState([]);

  const updateName = (event) => setNewName(event.target.value);
  const updateNums = (event) => setNewNum(event.target.value);

  const searchFilter = (event) => {
    let newSearch = event.target.value;
    setSearch(newSearch);
    let findEqualEl = persons.filter(
      (el) => el.name.toLowerCase() === newSearch.toLowerCase()
    );

    if (findEqualEl.length >= 1) {
      setFind(findEqualEl);
    } else {
      setFind([]);
    }
  };

  const addElement = (event) => {
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNum,
      id: String(persons.length + 1),
    };

    let getBoolean = persons.some(
      (el) => JSON.stringify(el) === JSON.stringify(newObj)
    );

    if (getBoolean) {
      alert(`${newObj.name} already added to phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewName('');
      setNewNum('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={searchFilter} value={search} />
      </div>
      <Lists obj={find} />
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
