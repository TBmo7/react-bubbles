import React, {useState} from "react";

import {axiosWithAuth} from "../utils/AxiosWithAuth"

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({})

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth().post("/login", credentials) //sending credentials to auth trying to get a token
    .then(res=>{
      console.log("LOGIN RES FROM LOGIN.JS", res)
      localStorage.setItem('token',res.data.payload)
      props.history.push('/protected') //not sure if this is correct just yet
    })
    .catch(err =>{console.log("LOGIN ERROR", err)})
  }

  const handleChange = e =>{
    setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
    })
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <br/>
      <form onSubmit = {login}>
                <input
                type = "text"
                name = "username"
                placeholder = "Username"
                value = {credentials.username}
                onChange = {handleChange}
                />
                <input
                type = "password"
                name = "password"
                placeholder = "password"
                value = {credentials.password}
                onChange = {handleChange}
                />
               <button>Log In</button>     
            </form>
    </>
  );
};

export default Login;
