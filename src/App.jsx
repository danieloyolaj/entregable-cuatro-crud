import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import UsersForm from './components/UsersForm'
import CardUsers from './components/CardUsers'

function App() {

  const [users, setUsers] = useState() //This is to create new users
  const [updateInfo, setUpdateInfo] = useState() //This is to update users
  const [isFormOpen, setIsFormOpen] = useState(false) //This is for the form
  // const [isUserDeleted, setIsUserDeleted] = useState(false) //This is for the user deletion

  //function to READ all users
  const readAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    readAllUsers()
  }, [])
  
  const handleOpenForm = () => { setIsFormOpen(true) }
  const handleCloseForm = () => { setIsFormOpen(false) }

  //Shows form
  // function showForm() {
  //   let myElement = document.getElementById("myForm")
  //   if(myElement.style.display === "none"){
  //     myElement.style.display = "block"
  //   }else{
  //     myElement.style.display = "none"
  //   }
  // }

  return (
    <div className="App">
      
      <div className="card-header">
        <h1>Users</h1>
        <button onClick={handleOpenForm} className="create-user-btn"> + Create new user</button>
      </div>
      <div className={isFormOpen ? 'form-container' : 'form-none'}>
        <UsersForm 
          readAllUsers={readAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className="card-container">
        {
          //Showing the users list
          users?.map(user => (
            <CardUsers 
              key={user.id}
              user={user}
              readAllUsers={readAllUsers}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
