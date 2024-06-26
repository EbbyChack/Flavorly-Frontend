import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

import Home from "./Home";

const PrivateAdminRoute = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.loggedProfile));

  //Checking the role of the user
  const token = useSelector((state) => state.auth.loggedProfile);

  let role = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    role = decodedToken[pathway];
  }

  function MountedComponent() {
    return Home(true);
  }

  return <div>{isLoggedIn && role === "Admin" ? <Outlet /> : <MountedComponent />}</div>;
};
export default PrivateAdminRoute;
