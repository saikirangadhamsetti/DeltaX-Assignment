import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import { UserContext } from "../App";

export default function Login() {
  const [email1, setEmail] = useState("");
  const [error, SetError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [user, setUser] = useState();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsername(e.target[0].value);
    setPassword(e.target[1].value);
    console.log(e.target[0], e.target[1]);

    fetch("api/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === true) {
          setUser(data.message._id);
          localStorage.setItem("user", data.message._id);
        }
        console.log(data.success);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValidatioin = (e) => {
    setEmail(e.target.value);
    setUsername(e.target.value);
    if (regEx.test(email1) === false) {
      SetError("Please Enter valid Email address");
    } else {
      SetError("");
      return true;
    }
  };

  return (
    <div className="primary">
      <form onSubmit={handleSubmit}>
        {/* <img  src={pic}/> */}
        <div className="icon">
          <input
            className="textfield"
            placeholder="email"
            type="text"
            name="name"
            // onChange={emailValidatioin}
          />
        </div>
        <p>{error}</p>
        {/* <img  src={passwordpic}/> */}
        <div className="icon1">
          <input
            className="textfield"
            type="password"
            placeholder="password"
            name="password/"
          />
        </div>
        <br></br>
        <button className="button">SIGNUP</button>
        <p className="bottom">
          Already on Flyero? Tap to{" "}
          <a className="href" href="">
            LOGIN
          </a>
        </p>
      </form>
    </div>
  );
}
