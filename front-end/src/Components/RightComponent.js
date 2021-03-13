import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent.js";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";
import axios from "../Axios";

function RightComponent({ user }) {
  const [modal, setmodal] = useState(false);
  const [bool, setbool] = useState(false);
  const handleOpen = () => setmodal(true);
  const handleClose = () => setmodal(false);

  useEffect(() => {
    if (bool == true) {
      $(".public").prop("disabled", "true");
    }
  }, [bool]);
  const handleSubmit = () => {
    axios
      .post("/new-channel", {
        user_id: user?._id,
        channel_name: $(".name").val(),
        channel_desc: $(".desc").val(),
        private: bool,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <button onClick={handleOpen}>+ New Channel</button>

      <SearchComponent />

      {modal ? (
        <Modal show={modal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Channel Name</label>
            <input type="text" placeholder="Name" className="name" />
            <label>Channel Desc:</label>
            <input type="text" placeholder="Description" className="desc" />
            <input
              type="radio"
              onClick={() => setbool(false)}
              className="public"
            />
            <label>Public</label>
            <input
              type="radio"
              onClick={() => {
                setbool(true);
                $(".public").prop("disabled", "true");
              }}
              className="private"
            />
            <label>Private</label>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleSubmit}>Create</button>
          </Modal.Footer>{" "}
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default RightComponent;
