import { useEffect, useState } from 'react';
import Lists from './components/Lists';
import Form from './components/Forms';
import findEqualEl from './useSearchFilter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  const [search, setSearch] = useState('');
  const [find, setFind] = useState([]);

  const hook = () => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const updateName = (event) =>
    setNewPerson({ name: event.target.value, number: newPerson.number });
  const updateNums = (event) =>
    setNewPerson({ name: newPerson.name, number: event.target.value });

  const searchFilter = (event) => {
    let newSearch = event.target.value;
    setSearch(newSearch);

    const filteredPersons = findEqualEl(persons, newSearch);
    return setFind(filteredPersons);
  };

  const addElement = (event) => {
    event.preventDefault();

    const newObj = {
      name: newPerson.name,
      number: newPerson.number,
      id: String(persons.length + 1),
    };

    let getBoolean = persons.some(
      (el) => JSON.stringify(el.name) === JSON.stringify(newObj.name)
    );

    if (getBoolean) {
      alert(`${newObj.name} already added to phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewPerson({ name: '', number: '' });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Form
        title={'filter shown with: '}
        cliFunc={searchFilter}
        value={search}
      />
      <Lists obj={find} />
      <h3>Add a new</h3>
      <form>
        <Form title={'name: '} cliFunc={updateName} value={newPerson.name} />

        <Form
          title={'number: '}
          cliFunc={updateNums}
          value={newPerson.number}
        />

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
