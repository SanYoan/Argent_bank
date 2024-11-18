import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Signin from './pages/Signin/Signin'
import User from './pages/User/User.jsx'
import NotFound from './pages/NotFound/NotFound'
import React from 'react'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
