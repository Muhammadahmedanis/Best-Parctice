import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { Joke } from './useHook/use'
import Theme from './useHook/context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      <Joke />
      <Theme />
    </>
  )
}

export default App
