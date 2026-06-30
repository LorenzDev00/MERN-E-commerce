import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../screens/Store';

// Route guard: renders children only if the logged-in user is an admin
export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
