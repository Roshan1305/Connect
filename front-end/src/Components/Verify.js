import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import $ from "jquery";
import axios from "../Axios";
function Verify() {
  const email = sessionStorage.getItem("email");
  const history = useHistory();

  useEffect(() => {
    if (email == null) {
      history.push("/signup");
    }
  }, []);

  const handleOTP = () => {
    console.log("clicked");
    console.log($(".otp_input").val());
    axios
      .post("/otp-verify", {
        email: email,
        otp: $(".otp_input").val(),
      })
      .then((res) =>
        res.status == 200 ? history.push("/form") : console.log("")
      );
    // if (otpStatus == 200) {
    //   history.push("/form");
    // } else {
    //   alert("An error occured, try again later");
    // }
  };

  return (
    <div>
      <input type="text" placeholder="OTP" className="otp_input" />
      {/* <input type="text" placeholder="Password" name="password" /> */}
      <button onClick={handleOTP}>Submit</button>
    </div>
  );
}

export default Verify;
