import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Card,
  Container,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './App.css'
import Todo from './Todo'
import db from './firebase'
import firebase from 'firebase'
function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // when app loads we listent to databse and fetch ne todos as they get added/removed
  useEffect(() => {
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // setTodos(snapshot.docs.map((doc) => doc.data().todo))
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        )
      })
  }, [input])
  const addTodo = (event) => {
    // fires off when we click the button
    event.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTodos([...todos, input])
    setInput('')
  }
  return (
    <div className='App'>
      <h1>Chowa To Do App</h1>
      <form action=''>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          onClick={addTodo}
          type='submit'
          color='secondary'
          variant='contained'
        >
          ADD TODO
        </Button>
      </form>
      <Container>
        <Card>
          {todos.map((todo) => {
            return <Todo todo={todo} />
          })}
        </Card>
      </Container>
    </div>
  )
}

export default App
