import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../features/auth/authSlice.js'
import { isValidEmail, isValidPassword } from '../../utils/regex.jsx'

function Signin() {
  document.title = 'Argent Bank - Login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isValidEmail(email) || !isValidPassword(password)) {
      // Définir un message d'erreur si les validations échouent
      return setErrorMessage('Invalid password or email address')
    }

    try {
      // Appeler l'action loginUser avec email et password
      const action = await dispatch(loginUser({ email, password }))

      // Vérifier si l'action est bien remplie
      if (loginUser.fulfilled.match(action)) {
        sessionStorage.setItem('token', action.payload.token)
        if (rememberMe) localStorage.setItem('token', action.payload.token)
        navigate('/user')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa-solid fa-circle-user"></i>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </section>
    </main>
  )
}
export default Signin
