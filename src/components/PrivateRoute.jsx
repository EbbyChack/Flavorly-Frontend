import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";

const PrivateRoute = () => {
  
  const isLoggedIn = useSelector((state) => Boolean(state.auth.loggedProfile));



  function MountedComponent() {
    return LoginForm(true);
  }

  return <div>{isLoggedIn ? <Outlet /> : <MountedComponent />}</div>;
};
export default PrivateRoute;
