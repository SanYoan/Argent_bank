import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // Replace with your API base URL
  timeout: 1000,
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/signin'
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
