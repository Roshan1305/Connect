import React, { useEffect } from "react";
import Axios from "../Axios";
import { useHistory, withRouter } from "react-router-dom";
import $ from "jquery";

function Form() {
  const email = sessionStorage.getItem("email");
  const history = useHistory();

  useEffect(() => {
    if (email == null) {
      history.push("/signup");
    }
  }, []);

  const handlePassword = () => {
    Axios.post("/signup", {
      email: email,
      password: $(".signup-password").val(),
      username: $(".username").val(),
    }).then((res) => {
      if (res.status == 200) {
        history.push("/pref");
      } else {
        alert("Error");
      }
    });
    document.cookie = email;
  };

  return (
    <div>
      <input type="text" value={email} className="email" />
      <input type="text" className="username" />
      <input type="text" placeholder="Password" className="signup-password" />
      <button onClick={handlePassword}>Submit</button>
    </div>
  );
}

export default withRouter(Form);
