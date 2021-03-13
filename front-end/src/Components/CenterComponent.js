import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Axios from "../Axios";
import $ from "jquery";
import "../css/Center.css";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
function CenterComponent() {
  const [{ user, clickedChannel, channels }, dispatch] = useStateValue();
  const [channelInfo, setchannelInfo] = useState();
  const [messageHolder, setmessageHolder] = useState(null);
  // useEffect(() => {
  //   // console.log(clickedChannel);
  //   // Axios.post("/channel-info", {
  //   //   id: clickedChannel?._id,
  //   // }).then((res) => {
  //   //   setchannelInfo(res.data);
  //   // });
  //   console.log(channels);
  // }, [clickedChannel]);

  // const initialState = []

  // const ACTION = {
  //   ADD_MESSAGES : " "
  // }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("new-message", (data) => {
      if (clickedChannel != null) {
        setchannelInfo(data);
        dispatch({
          type: "CHANNELS",
          channels: data,
        });
      }
    });
  }, [clickedChannel]);
  //   const handleSend()=>{

  //   }

  useEffect(() => {
    channels?.map((channel) =>
      clickedChannel?._id === channel?._id
        ? setmessageHolder(channel.channel_message)
        : console.log("varamaaten")
    );
  }, [clickedChannel, channels]);

  console.log(messageHolder);

  const handleSend = () => {
    var obj = {
      message: $(".message").val(),
      name: user?.name,
      timestamp: Date.now,
    };
    setmessageHolder((prevState) => [...prevState, obj]);
    Axios.post("/channel_newMessage", {
      id: clickedChannel?._id,
      name: user.name,
      message: $(".message").val(),
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="center-full">
      <div className="channel-header">
        <div>{clickedChannel?._id}</div>
        <div>{clickedChannel?.channel_name}</div>
      </div>
      <div>
        {channelInfo?.channel_users?.map((user) => (
          <div>{user.name}</div>
        ))}
      </div>
      <div className="messages-container">
        {/* {channels?.map((channel) =>
          clickedChannel?._id === channel?._id
             ? channel?.channel_message?.map((singleMsg) =>
                  singleMsg.name == user?.name ? (
                    <div className="messages-width">
                      <div className="my-messages">
                        <div className="singleMsg-name">{singleMsg?.name}</div>
                        <div className="singleMsg-message">
                          {singleMsg?.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="messages-width">
                      <div className="other-messages">
                        <div className="singleMsg-name">{singleMsg.name}</div>
                        <div className="singleMsg-message">
                          {singleMsg.message}
                        </div>
                      </div>
                    </div>
                  )
                )
              console.log(channel?.channel_message)
              () => {
                console.log("Ulla dhaan iruke");

                setmessageHolder(channel.channel_message);
              }
            : ""
        )} */}
        {messageHolder != null
          ? messageHolder?.map((singleMsg) =>
              singleMsg.name == user?.name ? (
                <div className="messages-width">
                  <div className="my-messages">
                    <div className="singleMsg-name">{singleMsg?.name}</div>
                    <div className="singleMsg-message">
                      {singleMsg?.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="messages-width">
                  <div className="other-messages">
                    <div className="singleMsg-name">{singleMsg.name}</div>
                    <div className="singleMsg-message">{singleMsg.message}</div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
      <div className="send-field">
        <input type="text" placeholder="New Message" className="message" />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default CenterComponent;
