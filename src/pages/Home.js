import React from 'react'
import {useState, useEffect} from 'react'


const Home = () => {
    
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    useEffect(() => {
        const fetching = async () => {
            const res = await fetch('http://localhost:8080');
            const json = await res.json();
            setData(json);
        }
        fetching();
    }
    , [])

    const handleSubmit = (e) => {
        // const newUser = {username, password}
        e.preventDefault();
        const fetching = async () => {
            const res = await fetch('http://localhost:8080/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: {username, password}
                
            })
            if (res.ok) {
                setUsername('');
                setPassword('');
            }
            
        }
        fetching();
    }


  return (
    <div>
        <h1>Home</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange= {(e) => setUsername(e.currentTarget.value)}/>
        <input type="password" placeholder="Password" onChange= {(e) => setPassword(e.currentTarget.value)} />
        <button type="submit">Login</button>
        </form>
        <div>
            {data && data.map((item, index) => (
                <div key={index}>
                    <h3>{item.Firstname} {item.Lastname}</h3>
                </div>

            ))}

        </div>

    </div>


  )
}

export default Home;