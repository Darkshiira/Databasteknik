import React from 'react'
import { useState } from 'react'
import Msgbox from '../components/Msgbox'
import Singlelink from '../components/Singlelink'



const Home = () => {

    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('true');
    const [failedlogin, setfailedlogin] = useState('false')
    let msg='Fel användarnamn eller lösenord, vill du gå vidare till registrering?'

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { username, password }
        const fetching = async () => {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })
            console.log('res: ' + res)
            console.log('res-status:' + res.status)
            if (res.status === 200) {
                setLogin('false');
                setUsername('');
                setPassword('');

                const fetchData = async () => {
                    const res = await fetch('http://localhost:8080');
                    const json = await res.json();
                    setData(json);
                }
                fetchData();
            }
            else {
                console.log(res)
                setfailedlogin('true')
            }
        }
        fetching();

    }

    return (
        <div>
            <h1>Home</h1>

            {login === 'true' ?
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.currentTarget.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} />
                    <button type="submit" >Log in!</button>
                </form>

                :

                data.map((item, index) => (
                    <div key={index}>
                        <h3>{item.Username} {item.Pass} {item.Lastlog}</h3>
                        
                        
                    </div>
                   
                ))}


            {login === 'true' ? null : <button onClick={(e) => setLogin("true")}> Log out!</button>}
            {failedlogin === 'true' ?
            <div>
                <Msgbox text1={msg}/>
                <Singlelink target={'/Register'} text={'Register'}/>

            </div> : null}

 
        </div>
    )
}

export default Home;