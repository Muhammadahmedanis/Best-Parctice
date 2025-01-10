// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { AuthContextProvider } from './context/authContext'
import Routing from './router/routing'

function App() {
  return (
    <>
    <AuthContextProvider>
      <Routing />
    </AuthContextProvider>
    </>
  )
}

export default App