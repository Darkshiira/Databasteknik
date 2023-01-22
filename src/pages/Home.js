import React from "react";
import { useState } from "react";
import Msgbox from "../components/Msgbox";
import Singlelink from "../components/Singlelink";

const Home = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [failedlogin, setfailedlogin] = useState(false);
  let msg =
    "Fel användarnamn eller lösenord, vill du gå vidare till registrering?";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password };
    const fetching = async () => {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.status === 200) {
        setLogin(false);
        setfailedlogin(false)
        setUsername("");
        setPassword("");

        const fetchData = async () => {
          const res = await fetch("http://localhost:8080");
          const json = await res.json();
          setData(json);
        };
        fetchData();
      } else {
        setfailedlogin(true);

      }
    };
    fetching();
  };

  return (
    <div className="formDiv">
      <h1>Home</h1>

      {login === true ? (
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="form-username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            required
            className="form-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="button-submit" type="submit">
            Log in!
          </button>
        </form>
      ) : (
        <table className="table-div">
          <thead>
          <tr className="table-row">
            <th>Username</th>
            <th>Password</th>
            <th>Last time active</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr className="table-row table-row-map" key={index}>
              <td>{item.Username}</td>
              <td>{item.Pass}</td>
              <td>{item.Lastlog}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}

      {login === true ? null : (
        <button className="button-logOut" onClick={(e) => setLogin(true)}>
          {" "}
          Log out!
        </button>
      )}
      {failedlogin === true ? (
        <div>
          <Msgbox text1={msg} />
          <Singlelink target={"/Register"} text={"Register"} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
