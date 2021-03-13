import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import $ from "jquery";
import Axios from "../Axios";
import "../css/Preference.css";

function Preferences() {
  const email = sessionStorage.getItem("email") || document.cookie;
  const channels = [];
  const history = useHistory();
  const [pref, setpref] = useState("");

  useEffect(() => {
    if (!email) {
      history.push("/login");
    }
  });

  const handleClick = () => {
    var count = 0;
    const length = pref.length;
    pref.map((pref) => {
      Axios.post("/set-pref", {
        email: email,
        pref: pref,
      }).then((res) => {
        count = count + 1;
        console.log(res);
        if (count == length) {
          if (res) {
            history.push("/home");
          }
        }
      });
    });
    console.log(pref);
  };

  const handleSkip = () => {
    history.push("/home");
  };

  $(document).ready(function () {
    $(".sports")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Sports"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });

    $(".films")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Films and TV"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".business")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Business and Finance"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".arts")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Arts"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".science")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Science"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".fashion")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Fashion"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".news")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "News"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".India")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "India"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });
    $(".politics")
      .unbind()
      .on("click", function () {
        setpref((prevChannel) => [...prevChannel, "Politics"]);
        $(this).off("click"); //or $(this).unbind()
        $(this).css({ "pointer-events": "none", transform: "scale(1.05)" });
      });

    if (pref.length == 0) {
      $(".submit").css("pointer-events", "none", "cursor", "not-allowed");
    } else {
      $(".submit").css("pointer-events", "auto", "cursor", "pointer");
    }
  });

  return (
    <div>
      <h1>Preferences / Suggested Channels</h1>
      <div className="pref">
        <div id="prefName" style={{ cursor: "pointer" }} className="films">
          Films and TV
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="sports">
          Sports
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="business">
          Business and Finance
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="arts">
          Arts and Culture
        </div>
      </div>
      <div className="prefSec">
        <div id="prefName" style={{ cursor: "pointer" }} className="science">
          Science and Technology
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="fashion">
          Fashion
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="news">
          News
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="India">
          India
        </div>
        <div id="prefName" style={{ cursor: "pointer" }} className="politics">
          Politics
        </div>
      </div>
      <button className="skip" onClick={handleSkip}>
        Skip
      </button>
      <button className="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}

export default Preferences;
