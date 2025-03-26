import React from 'react'
import './index.css'
import Body from './pages/body'
import { ThemeProvider } from './context/themeContext'
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <>
      <PrimeReactProvider>
        <ThemeProvider>
          <Body />
        </ThemeProvider>
      </PrimeReactProvider>
    </>
  )
}

export default App