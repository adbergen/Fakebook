import React from 'react';
import Navbar from './navbar';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import { Route } from 'react-router-dom';
import ProfileContainer from '../profile/profile_container';

const LoggedIn = () => (
  <div>
    <Navbar />
    <Route path='/feed/users/:userId' component={ProfileContainer}/>
  </div>
);

export default LoggedIn;