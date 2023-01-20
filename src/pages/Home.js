import React from 'react'
import {useState, useEffect} from 'react'


const Home = () => {
    
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('true');
   
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080');
            const json = await res.json();
            console.log('fetched')
            setData(json);
        }
        fetchData();
    }
    , [])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {username, password}
        const fetching = async () => {
            const res = await fetch('http://localhost:8080/login', {
                method : 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })
            if (res.status === 200) {
                console.log(res)
                setLogin('false');
                setUsername('');
                setPassword('');
                
            }

        else {
            console.log(res)
        }
    }
        fetching();
    
    }

  return (
    <div>
        <h1>Home</h1>

        {login === 'true' ?
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange= {(e) => setUsername(e.currentTarget.value)}/>
        <input type="password" placeholder="Password" onChange= {(e) => setPassword(e.currentTarget.value)} />
            <button type = "submit" >Log in!</button>
        </form>

        : data.map((item, index) => (
                <div key={index}>
                    <h3>{item.Username} {item.Pass} {item.Lastlog}</h3>
                </div>
            ))} 
        {login === 'false' && <button onClick={setLogin(true)}> Log out!</button>}
        </div>

  )
}

export default Home;