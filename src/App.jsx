import { useState } from 'react'
import './App.css'
import { Menu } from './components/Menu.jsx'
import { Orders } from './components/Orders.jsx'
import { LoginForm } from './components/LoginForm.jsx'
import { Header } from './components/Header.jsx'

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <>
      <Header 
      isAdmin={isAdmin} 
      setIsAdmin={setIsAdmin} 
      isAuthenticated={isAuthenticated} 
      setIsAuthenticated={setIsAuthenticated}/>

      {isAuthenticated ? (
        <div className='container mx-auto px-4'>
          {isAdmin ? (
            <div>
              <h1 className='text-3xl font-bold mb-4'></h1>
              <Orders />
            </div>
          ) : (
              <Menu/>
          )}
              </div>
            ) : (
              <LoginForm
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
        )}
  </>       
  );
}

export default App;