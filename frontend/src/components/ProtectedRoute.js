import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = (props) => {
  if (props.loggedIn) {
    return props.children
  }

  return <Navigate to="/sign-in" replace/>

  }

export default ProtectedRouteElement;