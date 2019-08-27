import ReactOnRails from 'react-on-rails';

import Users from '../bundles/Users/components/Users';
import User from '../bundles/User/components/User'
import Signup from '../bundles/Signup/components/Signup'
import Login from '../bundles/Login/components/Login'

// This is how react_on_rails can see the Tasks in the browser.
ReactOnRails.register({
  Users,
  User,
  Signup,
  Login,
});
