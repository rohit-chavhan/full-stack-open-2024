import { useEffect, useState } from 'react';
import Lists from './components/Lists';
import Form from './components/Forms';
import findEqualEl from './useSearchFilter';
import backendCalls from './services/backendCalls';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [search, setSearch] = useState('');
  const [find, setFind] = useState([]);
  const [notification, setNotification] = useState(null);

  const hook = () => {
    backendCalls.getAll().then((data) => {
      return setPersons(data);
    });
  };
  useEffect(hook, []);

  const updateName = (event) => {
    setNewPerson({ name: event.target.value, number: newPerson.number });
  };

  const updateNums = (event) => {
    setNewPerson({ name: newPerson.name, number: event.target.value });
  };

  let resetFormfields = () => setNewPerson({ name: '', number: '' });

  const searchFilter = (event) => {
    let newSearch = event.target.value;
    setSearch(newSearch);

    const filteredPersons = findEqualEl(persons, newSearch);
    return setFind(filteredPersons);
  };

  const usingPut = (old, newOb) => {
    let changedContact = { ...old, number: newOb.number };

    backendCalls
      .updateContact(changedContact)
      .then((response) =>
        setPersons(persons.map((n) => (n.id === response.id ? response : n)))
      );
    resetFormfields();
  };

  const stringForError = (msg) =>
    `Information of ${msg} has already been removed from server`;

  const handleNotification = (msg, value) => {
    value === 'error'
      ? setNotification(stringForError(msg))
      : setNotification(`${value} ${msg}`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addElement = (event) => {
    event.preventDefault();

    const newObj = {
      id: String(persons.length + 1),
      name: newPerson.name,
      number: newPerson.number,
    };

    let getBoolean = persons.some(
      (el) => JSON.stringify(el.name) === JSON.stringify(newObj.name)
    );

    if (getBoolean) {
      const findContact = persons.filter((el) => el.name === newObj.name);

      let userBolvalue = window.confirm(
        `${newObj.name} already added to phonebook`
      );
      userBolvalue ? usingPut(findContact[0], newObj) : null;
      handleNotification(newObj.name, 'Updated');
    } else {
      backendCalls.create(newObj).then((response) => {
        setPersons(persons.concat(response));
        resetFormfields();
      });
      handleNotification(newObj.name, 'Added');
    }
  };

  const deleteCalls = (id) => {
    const request = backendCalls.deleteContact(id);
    request.catch((res) => {
      let el = persons.filter((el) => el.id === id);
      handleNotification(el[0].name, 'error');
    });

    let newRay = persons.filter((el) => el.id !== id);
    setPersons(newRay);
  };

  const toDelete = (name, id) => {
    let x = window.confirm(`Delete ${name}`);
    x ? deleteCalls(id) : null;
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={notification} />

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
          <button onClick={addElement} type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Lists obj={persons} delete={toDelete} />
    </div>
  );
};

export default App;
