import React from "react";

function SingleChannelLeft({ channel }) {
  return (
    <div>
      <div onClick={handleClick(channel._id)}>{channel.channel_name}</div>
    </div>
  );
}

export default SingleChannelLeft;
