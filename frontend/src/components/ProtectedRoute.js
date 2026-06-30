import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../screens/Store';

// Route guard: renders children only if the user is logged in
export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/signin" />;
}
