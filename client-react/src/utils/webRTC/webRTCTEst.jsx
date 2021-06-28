import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import socketClient from "socket.io-client";
const myPeer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "5000",
});
const SERVER = "http://localhost:5000";
let socket = socketClient(SERVER);
let myVideoStream;
const myVideo = document.createElement("video");
function WebRTCTEst() {
  const [peers, setPeers] = useState([])
  const [vidTab, setVidTab] = useState([])
  const vidref = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        myVideoStream = stream;
        AddVideoStream(myVideo, stream);
        console.log("MYYYYYaddVideoStream" + stream)
        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            AddVideoStream(video, userVideoStream);
            console.log("addVideoStream" + userVideoStream)
          });
        });

        socket.on("user-connected", (userId) => {
          setTimeout(() => {
            // user joined
            connectToNewUser(userId, stream);
          }, 1000);
        });


      });

    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });

    myPeer.on("open", (id) => {
      socket.emit("join-room", "zz", id);
    });
  }, []);

  socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
  });

  myPeer.on("open", (id) => {
    socket.emit("join-room", "zz", id);
  });

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      AddVideoStream(video, userVideoStream);
      console.log("addVideoStream22" + userVideoStream)
    });
    call.on("close", () => {
      video.remove();
    });

    peers[userId] = call;
  }
  const tab = [];
  const AddVideoStream = (video, stream) => {

    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    tab.push("zazz");
    setVidTab(tab)
    console.log("test");
  }
  return <div>


    {vidTab.length != 0 ? vidTab.map((el) => (
      <div> {el}</div>
    )) : ''}

  </div>;
}
export default WebRTCTEst;
