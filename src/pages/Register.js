import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Msgbox from "../components/Msgbox"
import Singlelink from "../components/Singlelink";

const Register = () => {
  //Sets the state of the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedreg, setFailedreg] = useState(false);
  const [successlog, setSuccecclog] = useState(false);
  const [msg, setMsg]=useState("")
  //let msg = "";
  const navigate = useNavigate();

  //Handles the submit of the form
  const handleSubmit = (e) => {
    const newUser = { username, password };
    e.preventDefault();
    const fetching = async () => {
      const res = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      //If the response is ok, then it will clear the username and password
      if (res.status == 201) {
        setFailedreg(false);
        setSuccecclog(true)
        setMsg( "You have been registered, please log in!")
        console.log("res okm " + res);
        setUsername("");
        setPassword("");
        console.log(msg);
        // alert("You have been registered, please log in!");
        // navigate("/");
      } else {
        switch (res.status) {
          case 409:
            setSuccecclog(false)
            setFailedreg(true);
            setMsg("Username is already being used by someone else, please choose another!");
            break;
          case 400:
            setSuccecclog(false)
            setFailedreg(true);
            setMsg( "Ooops, make sure your username and password is long enough.");
            break;
        }
        console.log(res.statusText);
        console.log("else: " + res);
        console.log(msg);
      }
    };
    fetching();
    //Resets the form
    e.target.reset();
  };

  return (
        //When the form is submitted, it will call the handleSubmit function
    <div>

    {successlog===false ? (
    <div className="formDiv">
      <h1>Register</h1>
  
      <form className="form" onSubmit={handleSubmit}>
     
        {/* When the username or password is changed, it will set the state of the username and password */}
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
          Register
        </button>
      </form>
      </div>) :
      
       (
        <div>
          <Msgbox text1={msg} />
          <Singlelink target={"/"} text={"Log In"} />
        </div>
      )}
      {failedreg === true ? (
        <div>
          <Msgbox text1={msg} />
        </div>
      ) : null}

    </div>
  );
};

export default Register;
