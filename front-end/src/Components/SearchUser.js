import React from "react";
import { Link } from "react-router-dom";
// import "../Css/SearchUser.css";

function SearchUser({ channel }) {
  return (
    // <Link to={`/profile/${user.id}`}>
    <div className="searchUser">
      {/* <img
          className="searchUserImage"
          src={user.dp}
          alt="displaypicture"
        ></img> */}
      <p>{channel.channel_name}</p>
    </div>
    // </Link>
  );
}

export default SearchUser;
