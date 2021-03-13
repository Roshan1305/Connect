import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "../Axios";
import { useStateValue } from "../StateProvider";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import CenterComponent from "./CenterComponent";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
function Home() {
  const [{ channels, user }, dispatch] = useStateValue();
  const [userData, setuserData] = useState("");
  var x = document.cookie;

  const [userChannels, setuserChannels] = useState([]);

  useEffect(() => {
    axios.post("/channels").then((res) => {
      console.log(res.data);
      dispatch({
        type: "CHANNELS",
        channels: res.data,
      });
    });
  }, [x]);

  useEffect(() => {
    axios
      .post("/chat", {
        email: x,
      })
      .then((res) => {
        dispatch({
          type: "USER",
          user: res.data,
        });
      });
  }, [x]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="fullHome">
      <div className="left-container">
        {/* {user?.channels?.map((channel) => (

        ))} */}
        <LeftComponent />
      </div>
      <div className="center-container">
        <CenterComponent />
      </div>
      <div className="right-container">
        <RightComponent user={user} />
      </div>
    </div>
  );
}

export default Home;
