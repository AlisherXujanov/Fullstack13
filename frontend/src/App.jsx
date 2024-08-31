import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllComponents from "./components/AllComponents.jsx"
import './firebase.js'

export default function App() {

  return (
    <BrowserRouter>
      <AllComponents />
    </BrowserRouter>
  )
}
