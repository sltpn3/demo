import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './css/bootstrap.css';

function App() {
  return (
    // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
                    <Link to="/" className="nav-link active" aria-current="page">Home Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link active" aria-current="page">Admin Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active" aria-current="page">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard2" className="nav-link active" aria-current="page">Dashboard 2</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard3" className="nav-link active" aria-current="page">Dashboard 3</Link>
                  </li>
                </ul>
              </div>
              {/* {logout_button} */}
            </div>
          </nav>
        </div>
        {/* <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard2" component={Dashboard2} />
        <Route path="/dashboard3" component={Dashboard3} /> */}


      </Router>
    // </AuthContext.Provider >
  );
}

export default App;
