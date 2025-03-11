import React from 'react'
import './index.css'
import Body from './pages/body'
import { ThemeProvider } from './context/themeContext'

function App() {
  return (
    <>
      <ThemeProvider>
        <Body />
      </ThemeProvider>
    </>
  )
}

export default App