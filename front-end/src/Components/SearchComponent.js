import React from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import { useStateValue } from "../StateProvider";
import SearchUser from "./SearchUser";

function SearchComponent() {
  const [{ user, channels, clickedChannel }, dispatch] = useStateValue();

  const [search, setSearch] = React.useState([]);
  const closeShowdown = () => {
    $(".formSearch").val(null);
    setSearch(null);
  };

  const handleClick = (channelId) => {
    console.log(channelId);
    dispatch({
      type: "LEFT_CHANNEL",
      channelId: channelId,
    });
  };
  const searchUser = () => {
    var channelList = [];
    var searchInput = _.lowerCase(_.camelCase($(".formSearch").val())).replace(
      /\s+/g,
      ""
    );
    channels?.map((userTemp) => {
      if (
        _.lowerCase(_.camelCase(userTemp.channel_name))
          .replace(/\s+/g, "")
          .includes(searchInput)
      ) {
        channelList.push(userTemp);
      }
    });
    setSearch(channelList);
  };

  return (
    <div>
      <div className="searchContainer">
        <FormControl
          type="text"
          placeholder="Search profile"
          className="formSearch"
          onChange={searchUser}
        />
      </div>

      <div className="displaySearch">
        {/* <ReactLoading type='spinningBubbles' width='40px' height='40px' className='displaySearchLoading' color='black' /> */}
        <div className="displaySearchContents">
          {$(".formSearch").val() !== "" ? (
            search.length !== 0 ? (
              search.map((searchedChannel) => {
                return (
                  <div onClick={() => handleClick(searchedChannel)}>
                    <SearchUser
                      className="searchUser"
                      channel={searchedChannel}
                    />
                  </div>
                );
              })
            ) : (
              <p className="searchUser" id="notFound">
                User not found
              </p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
