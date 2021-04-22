import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../../img/logo.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
// import { InputGroup, Input, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button, InputGroup } from "reactstrap";

function Login(props) {
  console.log(props)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const referer = props.location.state && props.location.state.referer || '/';
  // console.log(referer);
  // const referer = props.location.state.referer || '/';
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const { REACT_APP_API_LOGIN } = process.env;
  const [errorMessage, setErrorMessage] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLogin = (data) => axios.post(REACT_APP_API_LOGIN + "/login",
    data
  ).then(result => {
    console.log(result)
    if (result.status === 200) {
      setAuthTokens(result.data);
      setLoggedIn(true);
    } else {
      setIsError(true);
    }
  }).catch(e => {
    setIsError(true);
    console.log(e.response);
    if (e.response) {
      setErrorMessage(e.response.data.message)
    } else {
      setErrorMessage('Network Error')
    }
  });

  const handleError = (errors) => { };

  if (isLoggedIn) {
    console.log('Logged In')
    return <Redirect to={referer} />;
  }

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  return (
    <div className="container mt-4 col-lg-2">
      <div className="text-center"><img src={logoImg} className="img-fluid" /></div>

      <Form onSubmit={handleSubmit(handleLogin, handleError)}>
        <FormGroup className="text-left">
          <InputGroup className="mt-4">
            <Input
              {...register("email", registerOptions.email)}
              type="email"
              placeholder="email"
              name="email"
            />
          </InputGroup>
          <small className="text-danger">
            {errors.email && errors.email.message}
          </small>
        </FormGroup>
        <FormGroup>
          <InputGroup className="mt-4">
            <Input
              {...register("password", registerOptions.password)}
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="password"
            />
            <span className="input-group-text" id="basic-addon1">
              <i className={passwordShown ? "bi bi-eye-slash" : "bi bi-eye"}
                onClick={togglePasswordVisiblity}></i>
            </span>
          </InputGroup>
          <small className="text-danger">
            {errors.password && errors.password.message}
          </small>
        </FormGroup>
        <div className="text-center"><Button className="mt-4 mb-2">Sign In</Button></div>

      </Form>
      <div className="text-center">
        <Link to="/signup">Don't have an account?</Link>
        {isError && <div>{errorMessage}</div>}
      </div>
    </div>
  );

  // return (
  //   <div className="container mt-4 text-center col-lg-2">
  //     <img src={logoImg} className="img-fluid" />
  //     <InputGroup>
  //       <Input
  //         className="mt-4"
  //         type="username"
  //         value={userName}
  //         onChange={e => {
  //           setUserName(e.target.value);
  //         }}
  //         placeholder="email"
  //       />
  //     </InputGroup>
  //     <InputGroup>
  //       <Input
  //         className="mt-4"
  //         type="password"
  //         value={password}
  //         onChange={e => {
  //           setPassword(e.target.value);
  //         }}
  //         placeholder="password"
  //       />

  //     </InputGroup>
  //     <Button className="mt-4 mb-2" onClick={postLogin}>Sign In</Button>
  //     <div>
  //       <Link to="/signup">Don't have an account?</Link>
  //       {isError && <div>The username or password provided were incorrect!</div>}
  //     </div>
  //   </div>
  // );
}

export default Login;