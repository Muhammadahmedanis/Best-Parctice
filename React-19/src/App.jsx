import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
// import Theme from './useHook/context'
// import Opotimistic from './useHook/opotimistic'
// import Joke from './useHook/use'
// import JokeItem from './useHook/use'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      {/* <Joke /> */}
      {/* <Theme /> */}
      {/* <Opotimistic /> */}
      {/* <Suspense fallback={"loading"}>
        <JokeItem />
      </Suspense> */}
    </>
  )
}

export default App
