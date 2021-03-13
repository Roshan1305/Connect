import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignUp from "./Components/SignUp.js";
import Verify from "./Components/Verify";
import Home from "./Components/Home";
import Form from "./Components/Form";
import Login from "./Components/Login";
import Preferences from "./Components/Preferences.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/verify" exact>
            <Verify />
          </Route>{" "}
          <Route path="/home" exact>
            <Home />
          </Route>{" "}
          <Route path="/form" exact>
            <Form />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/pref" exact>
            <Preferences />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
