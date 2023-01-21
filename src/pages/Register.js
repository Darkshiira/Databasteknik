import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    //Sets the state of the username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
const navigate=useNavigate()

    //Handles the submit of the form
    const handleSubmit = (e) => {

        const newUser = {username, password}
        e.preventDefault();
        const fetching = async () => {
            const res = await fetch('http://localhost:8080/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
                
            })
            //If the response is ok, then it will clear the username and password
            if (res.ok) {
                console.log('res okm ' + res)
                setUsername('');
                setPassword('');
                alert('You have been registered')
                navigate("/");
                
            }
            else{
                console.log('else: ' +res)
            }
        }
        fetching();
        //Resets the form
        e.target.reset();
    }
    
  return (
    //When the form is submitted, it will call the handleSubmit function
    <div><form onSubmit={handleSubmit}>
    {/* When the username or password is changed, it will set the state of the username and password */}
    <input type="text" placeholder="Username" onChange= {(e) => setUsername(e.currentTarget.value)}/>
    <input type="password" placeholder="Password" onChange= {(e) => setPassword(e.currentTarget.value)} />
    <button type="submit">Register</button>
    </form></div>
  )
}

export default Register