import React from "react";

function LeftComponent({ user }) {
  return (
    <div>
      <div>
        {user?.channels.map((channel) => (
          <div>{channel.channel_name}</div>
        ))}
      </div>
    </div>
  );
}

export default LeftComponent;
