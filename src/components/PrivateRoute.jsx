import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.loggedProfile));

  // function to render the LoginForm component
  function MountedComponent() {
    return LoginForm(true);
  }

  return <div>{isLoggedIn ? <Outlet /> : <MountedComponent />}</div>;
};
export default PrivateRoute;
