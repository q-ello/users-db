import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { pageSelector, useAppDispatch, useAppSelector } from './redux/hooks'
import { useEffect } from 'react'
import { getUsers } from './api/api'
import UserPage from './pages/UserPage/UserPage'
import { clearPage, clearSaveStatus, clearUsers } from './redux/usersSlice'
import Home from './pages/Home/Home'

function App() {
  const dispatch = useAppDispatch()
  const page = useAppSelector(pageSelector)

  useEffect(() => {
    dispatch(getUsers(page))
  }, [])


  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<UserPage/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App