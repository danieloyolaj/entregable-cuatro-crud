import React from 'react'
import axios from 'axios'

const CardUsers = ({ user, readAllUsers, setUpdateInfo, handleOpenForm }) => {

  //Delete a user  
    const deleteUser = () => {
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
        axios.delete(URL)
            .then(res =>{
                console.log(res.data)
                readAllUsers()
            })
            .catch(err => console.log(err))
    }

    //Function to handleUpdate
    const handleUpdate = () => {
      handleOpenForm()
      setUpdateInfo(user)
    }

  return (
    <div className='card'>
        <h3>{user['first_name']} {user['last_name']}</h3>
        <hr />
        <span>Email</span>
        <p>{user.email}</p>
        <span>Birthday</span>
        <p>{user.birthday}</p>
        <div className="card-button-container">
            <button onClick={handleUpdate} className='update-btn'></button>
            <button onClick={deleteUser} className='delete-btn'></button>
        </div>
    </div>
  )
}

export default CardUsers