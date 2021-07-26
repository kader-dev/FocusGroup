import React, { useEffect, useState } from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdCamera,
} from "react-icons/md";
import { FaHandPaper } from "react-icons/fa";
import ConversationButton from "./ConversationButton";
import {
  switchForScreenSharingStream,
  hangUp,
} from "../../../../utils/webRTC/webRTCHandler";
import DropdownRender from "../adminDropdown/Dropdown";
import Example from "../adminDropdown/Dropdown";
import Dropdown from "../adminDropdown/Dropdown";
import Axios from "axios";
import { getCookie, isAuth, signout } from "../../../../helpers/auth";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const styles = {
  buttonContainer: {
    display: "flex",
    position: "absolute",
    bottom: "6%",
    left: "35%",
  },
  icon: {
    width: "25px",
    height: "25px",
    fill: "#e6e5e8",
  },
};
const socket = io.connect("http://localhost:5000");
const ConversationButtons = (props, { history }) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall,
    groupCallStreams,
    setMuteAll,
  } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    textChange: "Update",
    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie("token");
    Axios.get(`http://localhost:5000/api/user/${isAuth()._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const { role, name, email } = res.data;
        setFormData({ ...formData, role, name, email });
      })
      .catch((err) => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push("/login");
          });
        }
      });
  };

  const [test, setTest] = useState(false);
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };
  const handleMuteAll = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
    groupCallStreams.map((stream, i) => {
      console.log(stream.getAudioTracks());
      stream.getAudioTracks()[i].enabled = false;
      console.log(stream.getAudioTracks());
      setMuteAll(false);
    });
    setTest(true);
  };
  const handleUnmuteAll = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
    groupCallStreams.map((stream, i) => {
      console.log(stream.getAudioTracks());
      stream.getAudioTracks()[i].enabled = true;
      console.log(stream.getAudioTracks());
      setMuteAll(true);
    });
    setTest(false);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleRaiseHandPressed = () => {
    const name = formData.name;
    socket.emit("hand", { name });
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic style={styles.icon} />
        ) : (
          <MdMicOff style={styles.icon} />
        )}
      </ConversationButton>

      {!groupCall && (
        <ConversationButton onClickHandler={handleHangUpButtonPressed}>
          <MdCallEnd style={styles.icon} />
        </ConversationButton>
      )}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={styles.icon} />
        ) : (
          <MdVideocamOff style={styles.icon} />
        )}
      </ConversationButton>
      {groupCall && (
        <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
          {screenSharingActive ? (
            <MdCamera style={styles.icon} />
          ) : (
            <MdVideoLabel style={styles.icon} />
          )}
        </ConversationButton>
      )}
      {formData.role != "admin" ? (
        <ConversationButton onClickHandler={handleRaiseHandPressed}>
          <FaHandPaper style={styles.icon} />
        </ConversationButton>
      ) : (
        ""
      )}
      {formData.role == "admin" ? (
        <ConversationButton>
          <Dropdown
            click={!test ? handleMuteAll : handleUnmuteAll}
            changeText={test}
          />
        </ConversationButton>
      ) : (
        ""
      )}
    </div>
  );
};

export default ConversationButtons;
