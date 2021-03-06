// import logo from './logo.svg';
import logo from './img/logo.svg';
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Button } from 'reactstrap';
import './css/bootstrap.css';
import './css/bootstrap-icons.css';
import { AuthContext } from "./context/auth";
import PrivateRoute from "./libs/PrivateRoute";
import Home from "./pages/Home/Home";
import HomeMaps from "./pages/Home/HomeMaps";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard1 from './pages/Dashboard/Dashboard1';

function App(props) {
  let logout_button;
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      // user login
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      // user logout
      localStorage.removeItem("tokens");
    }
    setAuthTokens(data);
  };

  function logOut() {
    localStorage.clear();
    setAuthTokens();
  }

  if (localStorage.getItem('tokens')) {
    logout_button = <Button onClick={logOut}>Logout</Button>;
    // logout_button = <Button onClick={logOut}>Log out</Button>;
  } else {
    logout_button = "";
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Demo App</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/dashboard1" className="nav-link active" aria-current="page">Dashboard 1</Link>
                  </li>
                </ul>
              </div>
              {logout_button}
            </div>
          </nav>
        </div>
        <PrivateRoute exact path="/" component={HomeMaps} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <PrivateRoute path="/admin" component={Admin} /> */}
        <PrivateRoute path="/dashboard1" component={Dashboard1} />
        {/* <Route path="/dashboard2" component={Dashboard2} /> */}
        {/* <Route path="/dashboard3" component={Dashboard3} /> */}


      </Router>
    </AuthContext.Provider >
  );
}

export default App;
