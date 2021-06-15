import React, { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { signout } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import Activate from './screens/Activate';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import Admin from './screens/Admin';
import Sidebar from "./screens/dashboard/Sidebar";
import RoomList from './screens/dashboard/room/RoomList';
function App({ history }) {
  const location = useLocation();
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

        <PrivateRoute path="/private" exact component={RoomList} />
        <AdminRoute path="/admin" exact component={Admin} />
        <Redirect to='/' />

      </Switch>
    </div>
  );
}

export default App;
