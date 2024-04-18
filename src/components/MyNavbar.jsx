import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Flavorly from "../assets/img/Flavorly.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchLogout } from "../redux/actions/auth";
import { clearUserInfo } from "../redux/reducers/userReducer";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function MyNavbar() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.loggedProfile));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(fetchLogout());
      dispatch(clearUserInfo());
      toast.success("Logout successful");
    } catch (e) {
      toast.error("Logout failed");
    } finally {
      navigate("/");
    }
  };

  const token = useSelector((state) => state.auth.loggedProfile);

  let role = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    role = decodedToken[pathway];
  }

  return (
    <div className="position-sticky top-0 z-3">
      <Navbar expand="lg" className="customNav ">
        <Container className="d-flex align-items-center">
          <Link to="/" className=" navbar-brand">
            <img
              src={Flavorly}
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
              style={{ width: "10em" }}
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto menuStyle">
              <Link to="/" className="nav-link customNavLink">
                Home
              </Link>
              <Link to="/allrecipes" className="nav-link customNavLink">
                All Recipes
              </Link>

              {isLoggedIn ? (
                <Link to="/profile" className="nav-link customNavLink">
                  Profile
                </Link>
              ) : null}
              {role === "Admin" && (
                <Link to="/adminRecipes" className="nav-link customNavLink">
                  Admin
                </Link>
              )}
              {!isLoggedIn ? (
                <Link to="/login">
                  <button class="logoutBtn ms-lg-3">
                    <div class="sign">
                      <FontAwesomeIcon icon={faSignInAlt} />
                    </div>

                    <div class="text">Login</div>
                  </button>
                </Link>
              ) : (
                <button class="logoutBtn ms-lg-3" onClick={handleLogout}>
                  <div class="sign">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>

                  <div class="text">Logout</div>
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
