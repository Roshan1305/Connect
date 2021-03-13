import React from "react";
import Axios from "../Axios";
import $ from "jquery";
import { useHistory, withRouter } from "react-router-dom";

function SignUp() {
  const history = useHistory();

  const handleClick = () => {
    console.log("Clicked");
    if (typeof Storage !== "undefined") {
      // Store
      sessionStorage.setItem("email", $(".signup-user").val());
    }
    Axios.post("/verify", {
      email: $(".signup-user").val(),
    }).then((res) => {
      if (res.status == 200) {
        history.push("/verify");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div>
      <input type="text" placeholder="User" className="signup-user" />
      {/* <input type="text" placeholder="Password" name="password" /> */}
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default withRouter(SignUp);
