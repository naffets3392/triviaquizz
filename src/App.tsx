import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import { ThemeProvider } from '@emotion/react'
import customTheme from './customTheme'
import Quizz from './pages/Quizz'

function App() {

  return (
  <>
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='quizz' element={<Quizz />}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </>
  )
}

export default App
