import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Modal,
  Input,
  Container,
  Card,
} from '@material-ui/core'
import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  adjust: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function Todo(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState()
  const date = new Date().toLocaleDateString()

  const updateTodo = () => {
    //   update the todo with new input text
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    )
    setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className={classes.adjust}
      >
        <div className={classes.paper}>
          <h1>Edit me</h1>
          <Input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo} color='secondary' variant='contained'>
            Update
          </Button>
        </div>
      </Modal>

      <List className='todo__list'>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText secondary={date} primary={props.todo.todo} container />
        </ListItem>
        <EditIcon onClick={(e) => setOpen(true)} color='primary' />
        <DeleteForeverIcon
          color='warning'
          onClick={(event) => {
            db.collection('todos').doc(props.todo.id).delete()
          }}
        />
      </List>
    </>
  )
}

export default Todo
