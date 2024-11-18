import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dataUser } from '../../features/user/userSlice'
import { logoutUser } from '../../features/auth/authSlice'
import React, { useEffect } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate() // Pour rediriger l'utilisateur après la déconnexion

  // Récupérer les données utilisateur depuis le Redux store
  const { userData } = useSelector((state) => state.user)
  const token = localStorage.getItem('token') // Vérifier la présence du token

  useEffect(() => {
    if (token) {
      dispatch(dataUser())
    }
  }, [dispatch, token]) // Dépendance sur le token

  const handleLogout = () => {
    localStorage.removeItem('token') // Supprimer le token
    dispatch(logoutUser()) // Appeler votre action de déconnexion
    navigate('/signin') // Rediriger vers la page de connexion
  }

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/home">
        <img
          className="main-nav-logo-image"
          src="/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <>
            <a className="main-nav-item" href="/user">
              <i className="fa fa-user-circle"></i>&nbsp;
              {userData.userName}
            </a>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>&nbsp; Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
