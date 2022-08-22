import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const defaultValue = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''
}

const UsersForm = ({ readAllUsers, updateInfo, setUpdateInfo, handleCloseForm }) => {


    const { register, handleSubmit, reset } = useForm()

    //create a new User
    const createUser = data => {
        const URL = 'https://users-crud1.herokuapp.com/users/'
        axios.post(URL, data)
            .then(res => {
                console.log(res.data)
                readAllUsers()
            })
            .catch(err => console.log(err))
    }

    

    //Updates the user
    useEffect(() => {
      if(updateInfo){
        reset(updateInfo)
      }     
    }, [updateInfo])
    
    const updateUser = data => {
        const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
        axios.patch(URL, data)
        .then(res => {
            console.log(res.data)
            readAllUsers()
        })
        .catch(err => console.log(err))
    }

    //sends the data to the API to create a user
    const submit = data => {
        if(updateInfo){
            //update the user   
            updateUser(data)
            setUpdateInfo()
        }else{
            //create the user
            createUser(data)
        }
        handleCloseForm()
        reset(defaultValue)
    }

  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className='my_form'>
            <div onClick={handleCloseForm} className="form__ex">x</div>
            <h2>{ updateInfo ? 'Update user' : 'Create user' }</h2>
            <ul>
                <li><label htmlFor="first_name">First name</label></li>
                <li><input {...register('first_name')} id="first_name" type="first_name"  required /></li>
                
                <li><label htmlFor="last_name">Last name</label></li>
                <li><input {...register('last_name')} id="last_name" type="text"  required /></li>

                <li><label htmlFor="email">Email</label></li>
                <li><input {...register('email')} id="email" type="text"  required /></li>

                <li><label htmlFor="email">Password</label></li>
                <li><input {...register('password')} id="password" type="password"  required /></li>
                
                <li><label htmlFor="birthday">Birthday</label></li>
                <li><input {...register('birthday')} id="birthday" type="date"  required /></li>
            </ul>
            
            <div className="form__btn__container">
                <button className="form__btn">{ updateInfo ? 'Update' : 'Create' }</button>
            </div>

        </form>
    </div>
  )
}

export default UsersForm