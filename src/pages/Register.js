import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //Sets the state of the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedreg, setFailedreg] = useState("false");
  const [successlog, setSuccecclog] = useState("false");
  let msg = "";
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
        console.log("res okm " + res);
        setUsername("");
        setPassword("");
        console.log(msg);
        alert("You have been registered, please log in!");
        navigate("/");
      } else {
        switch (res.status) {
          case 409:
            setFailedreg("true");
            msg = "användarnamnet är upptaget, välj ett annat!";
            break;
          case 400:
            setFailedreg("true");
            msg =
              "Ooops, ej registrerad. Kom ihåg att användarnamn och lösenord ska ha minst 3 bokstäver";
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
    <div className="formDiv">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* When the username or password is changed, it will set the state of the username and password */}
        <input
          className="form-username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          className="form-password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button className="button-submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
