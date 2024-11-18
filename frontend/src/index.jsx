// src/index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import userReducer from './features/user/userSlice.js'

// Combinez les réducteurs
const rootReducer = combineReducers({
  auth: authReducer, // Réducteur d'authentification
  user: userReducer,
})

// Configurez le store Redux
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
