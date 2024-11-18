import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/intercept'

// Action pour récupèrer les données utilisateur ( GET )
export const dataUser = createAsyncThunk('user/profile', async () => {
  // Envoie d'une requêtes http ( GET ) avec axios a l'adresse de l'api avec le token
  const response = await axiosInstance.get('/user/profile')
  // renvoie la reponse dans response.data
  return response.data
})

// Action pour mettre à jour le userName (PUT)
export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async (newUserName) => {
    // fait la mise a jour de l'userName en prenant le nouveau userName a l'adresse de l'api avec le token
    const response = await axiosInstance.put(`/user/profile/`, {
      userName: newUserName,
    })
    // retourne la reponse renvoyé par l'api
    return response.data
  }
)
//initialisation du state de userSlice avec userData ( qui sera un objet ) et error a null pour prévenir d'éventuel erreur
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    error: null,
  },
  extraReducers: (builder) => {
    // Gestion de la récupèration user (GET)
    // si la récupèration des données est un succès on ajoute les données de la reponse.data.body dans le state ( userData ) et on repasse error a null
    builder
      .addCase(dataUser.fulfilled, (state, action) => {
        state.userData = action.payload.body
        state.error = null
      })
      // si jamais c'est un echec on renvoie un message d'erreur dans le state error
      .addCase(dataUser.rejected, (state, action) => {
        state.error = action.error.message
      })
    // Gestion de la mise à jour du userName (PUT)
    //Si la mise à jour a réussie on modifie le state userData.userName avec la mise à jour retourné par la reponse
    builder
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userData.userName = action.payload.userName
        state.error = null
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
