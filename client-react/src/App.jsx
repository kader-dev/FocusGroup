import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import Activate from './screens/Activate';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import Admin from './screens/Admin';
import RoomList from './screens/dashboard/room/RoomList';
import TheRoom from './screens/ChatRoom/TheRoom';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import WebRTCTEst from './utils/webRTC/webRTCTEst';
import JoinRoom from './screens/ChatRoom/Components/JoinRoom';
import RecordingsList from './screens/dashboard/recordings/RecordingsList';
import Votes from './screens/dashboard/room/Votes/Votes';
function App({ history }) {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/" exact render={(props) => <Login {...props} />} />
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route
          path="/register"
          exact
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/users/password/forget"
          exact
          render={(props) => <ForgetPassword {...props} />}
        />
        <Route
          path="/users/password/reset/:token"
          exact
          render={(props) => <ResetPassword {...props} />}
        />
        <Route
          path="/users/activate/:token"
          exact
          render={(props) => <Activate {...props} />}
        />
        <Route
          path="/private/rooms"

          exact component={RoomList}
        />
        <Route
          path="/private/recordings"

          exact component={RecordingsList}
        />
        <Route
          path="/private/votes"

          exact component={Votes}
        />
        <Route
          path="/room/:roomID"

          exact component={TheRoom}
        />
        <Route
          path="/join"

          exact component={JoinRoom}
        />

        <PrivateRoute path="/private" exact component={RoomList} />
        <AdminRoute path="/client" exact component={RecordingsList} />

      </Switch>
    </div>
  );
}

export default withRouter(App);
