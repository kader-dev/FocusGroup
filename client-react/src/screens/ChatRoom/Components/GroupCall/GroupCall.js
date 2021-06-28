import React, { useEffect } from "react";
import { connect } from "react-redux";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import {
  callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../../../store/actions/callActions";
import * as webRTCGroupCallHandler from "../../../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import { useParams } from "react-router-dom";
const GroupCall = (props, { history }) => {
  const { roomID } = useParams();
  const {
    callState,
    localStream,
    groupCallActive,
    groupCallStreams,
    groupCallRooms,
  } = props;

  useEffect(() => {
    if (localStream) {
      webRTCGroupCallHandler.joinGroupCall("gg", roomID);
    }
  }, [localStream]);
  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };
  const handleListItemPressed = () => {
    webRTCGroupCallHandler.joinGroupCall("gg", roomID);
  };

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton
            onClickHandler={handleListItemPressed}
            label="Join room"
          />
        )}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={leaveRoom} label="Leave room" />
      )}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call,
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
