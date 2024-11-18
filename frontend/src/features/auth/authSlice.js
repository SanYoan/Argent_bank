import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/intercept'

// Créez une action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await axiosInstance.post('/user/login', {
      email,
      password,
    })
    return { token: response.data.body.token } // Retourner directement le token
  }
)

// Slice d'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    token: null,
    isConnected: false,
  },

  reducers: {
    logoutUser(state) {
      // Réinitialiser l'état lors de la déconnexion
      state.token = null
      state.isConnected = false
      state.error = null // Réinitialiser les erreurs
      localStorage.removeItem('token') // Supprimer le token du stockage local
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token // Assigner le token
        state.isConnected = true // L'utilisateur est connecté
        localStorage.setItem('token', action.payload.token) // Stocker le token dans le local
        state.error = null // Réinitialiser les erreurs
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message // Gérer les erreurs
        state.isConnected = false // Utilisateur non connecté
      })
  },
})

// Exporter l'action de déconnexion
export const { logoutUser } = authSlice.actions

export default authSlice.reducer // Exporter le réducteur
