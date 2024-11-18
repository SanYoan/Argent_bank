import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataUser, updateUserName } from '../../features/user/userSlice'

const User = () => {
  document.title = 'Argent Bank - Utilisateur'
  const dispatch = useDispatch()

  const { userData, error } = useSelector((state) => state.user)
  const [editToggle, setEditToggle] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  useEffect(() => {
    dispatch(dataUser())
  }, [dispatch])

  useEffect(() => {
    if (userData && userData.userName) {
      setNewUserName(userData.userName)
    }
  }, [userData])

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleEdit = (e) => {
    e.preventDefault()

    if (!newUserName.trim()) {
      alert('The userName cannot be empty!')
      return
    }

    dispatch(updateUserName(newUserName)).then(() => {
      dispatch(dataUser())
    })

    setEditToggle(false)
  }

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {!editToggle ? (
              <span>{userData.userName}</span>
            ) : (
              <form onSubmit={handleEdit}>
                <div className="inputArea">
                  <input
                    type="text"
                    autoFocus={true}
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                  <input type="text" value={userData.firstName} readOnly />
                  <input type="text" value={userData.lastName} readOnly />
                  <button className="edit-button" type="submit">
                    Valider
                  </button>
                </div>
              </form>
            )}
          </h1>
          <button
            className="edit-button"
            onClick={() => setEditToggle(!editToggle)}
          >
            {editToggle ? 'Annuler' : 'Edit Name'}
          </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default User
