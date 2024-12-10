import { useEffect, useState } from 'react'
import Lists from './components/Lists'
import Form from './components/Forms'
import findEqualEl from './useSearchFilter'
import backendCalls from './services/backendCalls'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [find, setFind] = useState([])
  const [notification, setNotification] = useState(null)

  const hook = () => {
    backendCalls.getAll().then((data) => {
      return setPersons(data)
    })
  }
  useEffect(hook, [])

  const formFields = (event) => {
    const {
      value,
      dataset: { form },
    } = event.target

    form === 'name'
      ? setNewPerson({ name: value, number: newPerson.number })
      : setNewPerson({ name: newPerson.name, number: value })
  }

  let resetFormfields = () => setNewPerson({ name: '', number: '' })

  const searchFilter = (event) => {
    let newSearch = event.target.value
    setSearch(newSearch)

    const filteredPersons = findEqualEl(persons, newSearch)
    return setFind(filteredPersons)
  }

  const usingPut = (old, newOb) => {
    let changedContact = { ...old, number: newOb.number }

    backendCalls
      .updateContact(changedContact)
      .then((response) =>
        setPersons(persons.map((n) => (n.id === response.id ? response : n)))
      )
    resetFormfields()
  }

  const handleNotification = (msg, color) => {
    setNotification({ msg, color })

    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const addElement = (event) => {
    event.preventDefault()

    const newObj = {
      id: String(persons.length + 1),
      name: newPerson.name,
      number: newPerson.number,
    }

    let getBoolean = persons.some(
      (el) => JSON.stringify(el.name) === JSON.stringify(newObj.name)
    )

    if (getBoolean) {
      const findContact = persons.filter((el) => el.name === newObj.name)

      let userBolvalue = window.confirm(
        `${newObj.name} already added to phonebook`
      )
      userBolvalue ? usingPut(findContact[0], newObj) : null
      handleNotification(newObj.name, 'green')
    } else {
      backendCalls
        .create(newObj)
        .then((response) => {
          setPersons(persons.concat(response))
          resetFormfields()
          handleNotification(newObj.name, 'green')
        })
        .catch((err) => {
          handleNotification(err.response.data.error, 'red')
        })
    }
  }

  const deleteCalls = (id) => {
    console.log(id)
    const request = backendCalls.deleteContact(id)
    request.catch((res) => {
      let el = persons.filter((el) => el.id === id)
      handleNotification(el[0].name, 'red')
    })

    let newRay = persons.filter((el) => el.id !== id)
    setPersons(newRay)
  }

  const toDelete = (name, id) => {
    let x = window.confirm(`Delete ${name}`)
    x ? deleteCalls(id) : null
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification !== null && (
        <Notification msg={notification.msg} color={notification.color} />
      )}

      <Form
        title={'filter shown with: '}
        cliFunc={searchFilter}
        value={search}
      />
      <Lists obj={find} />
      <h3>Add a new</h3>
      <form>
        <Form
          title={'name: '}
          cliFunc={formFields}
          value={newPerson.name}
          data={'name'}
        />

        <Form
          title={'number: '}
          cliFunc={formFields}
          value={newPerson.number}
          data={'num'}
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
  )
}

export default App
