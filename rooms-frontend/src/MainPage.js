import axios from "./axios.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";

function MainPage({ setUserlogin }) {
  let navigate = useNavigate();
  const [lr, setLr] = useState("l");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlestate = (val) => {
    setLr(val);
    console.log(val);
  };

  const handleSubmit = async (val) => {
    if (val === "l") {
      let result = await axios.post("/user/login", {
        username: username,
        password: password,
      });
      if (result.data === "LoginSuccess") {
        setUserlogin(username);
        navigate("/chatapp");
      }
    }

    if (val === "r") {
      let result = await axios.post("/user/new", {
        username: username,
        password: password,
        groups: [],
      });

      if (result.data === "UserCreated") {
        setUsername("");
        setPassword("");
        setLr("l");
      }
    }
  };

  return (
    <div className="mainpage">
      <div className="mainpage__box">
        <h1
          style={{
            color: "rgb(43, 40, 40)",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          Rooms
        </h1>
        <div className="mainpage__title">
          <span
            onClick={() => {
              handlestate("l");
            }}
          >
            Login
          </span>
          <span
            onClick={() => {
              handlestate("r");
            }}
          >
            Register
          </span>
        </div>

        <div className="mainpage__field">
          <h3>Username</h3>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
          />
        </div>

        <div className="mainpage__field">
          <h3>Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </div>

        <div onClick={() => handleSubmit(lr)} className="mainpage__submit">{`${
          lr === "l" ? "Sign In" : "Sign Up"
        }`}</div>
      </div>
    </div>
  );
}

export default MainPage;
