import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent.js";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";
import { storage } from "../firebase";
import axios from "../Axios";
import { useHistory } from "react-router-dom";
function RightComponent({ user }) {
  const [modal, setmodal] = useState(false);
  const [bool, setbool] = useState(false);
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [post, setpost] = useState("0");
  const [isCondnTrue, setisCondnTrue] = useState(false);
  const [urlImagestate, seturlImage] = useState([]);
  const [urlDocsstate, seturlDocs] = useState([]);
  var url = [];
  var urlImage = [];
  var urlDocs = [];
  var time = setInterval(function () {
    if (
      urlImage.length + urlDocs.length != 0 &&
      urlImage.length + urlDocs.length == images.length
    ) {
      $("#loadingUpload").hide();
      $(".postContainer").css({ opacity: "1" });
      clearInterval(time);
      history.push("/home");
    }
  }, 1000);
  const handleOpen = () => setmodal(true);
  const handleClose = () => setmodal(false);

  useEffect(() => {
    if (bool == true) {
      $(".public").prop("disabled", "true");
    }
  }, [bool]);
  const handleSubmit = () => {
    if (images.length !== 0) {
      $(".postContainer").css({ opacity: "0.3" });
      $("#loadingUpload").show();
      for (let i = 0; i < images.length; i++) {
        const type = images[i].type.substring(
          images[i].type.lastIndexOf("/") + 1
        );
        console.log(type);
        if (
          type === "jpg" ||
          type === "jpeg" ||
          type === "png" ||
          type === "gif"
        ) {
          const date = Date.now();
          const uploadTask = storage
            .ref(`images/${images[i]?.name}_${date}`)
            .put(images[i]);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progressCurrent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(`${images[i]?.name}_${date}`)
                .getDownloadURL()
                .then((urlTemp) => {
                  urlImage.push(urlTemp);
                  seturlImage(urlImage);
                  if (urlImage.length + urlDocs.length == images.length) {
                    setisCondnTrue(true);
                  }
                });
            }
          );
        } else {
          const date = Date.now();
          const uploadTask = storage
            .ref(`docs/${images[i]?.name}_${date}`)
            .put(images[i]);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progressCurrent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("docs")
                .child(`${images[i]?.name}_${date}`)
                .getDownloadURL()
                .then((urlTemp) => {
                  urlDocs.push(urlTemp);
                  seturlDocs(urlDocs);
                  if (urlImage.length + urlDocs.length == images.length) {
                    setisCondnTrue(true);
                  }
                });
            }
          );
        }
      }
    } else {
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
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      var temp = e.target.files[0];
      $("#uploadButton").css({ cursor: "pointer" });
      setImages([...images, temp]);
    }
  };
  useEffect(() => {
    if (isCondnTrue) {
      axios
        .post("/new-channel", {
          user_id: user?._id,
          channel_name: $(".name").val(),
          channel_desc: $(".desc").val(),
          private: bool,
          images: urlImagestate,
        })
        .then((res) => console.log(res.data));
    }
  }, [isCondnTrue]);
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
            <div className="filecont">
              <div className="fileUpload" onChange={handleChange}>
                <CloudUploadIcon id="cloudIcon" />
                <input id="upload" type="file" hidden multiple />
                <label htmlFor="upload" className="bg-success uploadbut">
                  {" "}
                  Choose files to Upload{" "}
                </label>
                {/* {post == "0" ? ( */}
                <div className="uploadContainer">
                  {images?.map((item) => {
                    const type = item.type.substring(
                      item.type.lastIndexOf("/") + 1
                    );
                    if (
                      type === "jpg" ||
                      type === "jpeg" ||
                      type === "png" ||
                      type === "gif"
                    ) {
                      return (
                        <div className="uploadContainerShyam">
                          <p id="uploadStat">{item.name}</p>
                          <img
                            className="previewImage"
                            src={window.URL.createObjectURL(item)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="uploadContainerShyam">
                          <p id="uploadStat">{item.name}</p>
                          <img className="previewImage" src="docs.png" />
                        </div>
                      );
                    }
                  })}
                </div>
                {/* ) : (
                  <div className="uploadContainer">
                    {post.post_image?.map((item) => (
                      <div className="uploadContainerShyam">
                        <p id="uploadStat">{item.name}</p>
                        <img className="previewImage" src={item} />
                        <div></div>
                      </div>
                    ))}
                  </div>
                ) */}
              </div>
            </div>
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
