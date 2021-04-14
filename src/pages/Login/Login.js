import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../../img/logo.png";
import { useAuth } from "../../context/auth";



function Login(props) {
  console.log(props)
  const referer = props.location.state.referer || '/';
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const { REACT_APP_CUBEJS_TOKEN, REACT_APP_API_URL, REACT_APP_API_LOGIN } = process.env;

  function postLogin() {
    axios.post(REACT_APP_API_LOGIN + "/login", {
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    console.log('Logged In')
    return <Redirect to={referer} />;
  }

  return (
    <div>
      <img src={logoImg} />
      <div>
        <input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <button onClick={postLogin}>Sign In</button>
      </div>
      <Link to="/signup">Don't have an account?</Link>
        { isError && <div>The username or password provided were incorrect!</div> }
    </div>
  );
}

export default Login;