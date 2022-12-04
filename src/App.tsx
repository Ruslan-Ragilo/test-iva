import { createContext, useEffect, useReducer, useState } from 'react'
import './App.scss'
import Bookmark from './components/Bookmark/Bookmark'
import Form from './components/Form/Form'
import ListTags from './components/ListTags/ListTags'

function App() {
  // JSON.parse(localStorage.getItem('listBookmarks'))
  return (
    <div className="App">
      <h2>React APP</h2>
      <Form />
      <ListTags />
      <Bookmark />
    </div>
  )
}

export default App
