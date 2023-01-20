import React from 'react'
import {useState, useEffect} from 'react'


const Home = () => {
    
    const [data, setData] = useState([]);
   
    

    useEffect(() => {
        const fetching = async () => {
            const res = await fetch('http://localhost:8080');
            const json = await res.json();
            setData(json);
        }
        fetching();
    }
    , [])

    


  return (
    <div>
        <h1>Home</h1>
        
        <div>
            {data && data.map((item, index) => (
                <div key={index}>
                    <h3>{item.Username} {item.Pass} {item.Lastlog}</h3>
                </div>

            ))}

        </div>

    </div>


  )
}

export default Home;