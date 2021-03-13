import React from "react";
import { useStateValue } from "../StateProvider";

function LeftComponent() {
  const [{ user, clickedChannel }, dispatch] = useStateValue();

  console.log(user);
  const handleClick = (channelId) => {
    console.log(channelId);
    dispatch({
      type: "LEFT_CHANNEL",
      channelId: channelId,
    });
  };

  return (
    <div>
      <div>
        {user?.channels.map((channel) => (
          // <SingleChannelLeft channel={channel} />
          <div onClick={() => handleClick(channel)}>{channel.channel_name}</div>
        ))}
      </div>
    </div>
  );
}

export default LeftComponent;
