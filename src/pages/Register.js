import React from 'react'
import {useState} from 'react'

const Register = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {

        const newUser = {username, password}
        e.preventDefault();
        const fetching = async () => {
            const res = await fetch('http://localhost:8080/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
                
            })
            if (res.ok) {
                setUsername('');
                setPassword('');
            }
            
        }
        fetching();
    }
  return (
    <div><form onSubmit={handleSubmit}>
    <input type="text" placeholder="Username" onChange= {(e) => setUsername(e.currentTarget.value)}/>
    <input type="password" placeholder="Password" onChange= {(e) => setPassword(e.currentTarget.value)} />
    <button type="submit">Register</button>
    </form></div>
  )
}

export default Register