import React from "react";
import { Link } from "react-router-dom";

function MyFooter() {
  return (
    <footer className="footerCustom">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="adminRequest">
              <div className="row">
                <div className="col-12 col-md-5 col-lg-8 ">
                  <img
                    src="https://ikeamuseum.com/blobiicsikeamu4941109594/wp-content/uploads/2022/05/im-a-night-at-the-museum-big-buffet.jpg?sv=2022-11-02&ss=bf&srt=o&sp=rwact&se=2032-07-19T20:53:53Z&st=2023-07-19T00:53:53Z&spr=https,http&sig=CbW5rmYp6FrCBT77fuGZVaQIyQ6kOS0Coe6AbA3prrw%3D"
                    alt="footerImg"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-5 col-lg-4">
                  <div className=" py-3 px-1">
                    <h6>Want to add your own recipes?</h6>
                    <p>
                      If you're passionate about cooking and have a flair for creativity, write us an email detailing
                      your qualifications, interests, and any innovative ideas you have in mind.
                    </p>
                    <a href="mailto:youremail@example.com" className="email-button">Contact us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 d-flex flex-column justify-content-center mt-5 mt-lg-0">
            <div className="row justify-content-center">
              <div className="col-5">
                <div className="d-flex flex-column align-items-center">
                  <h2>Explore</h2>
                  <div>
                    <ul>
                      <li>
                        <Link to="/allrecipes">All Recipes</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="d-flex flex-column align-items-center">
                  <h2>Follow</h2>
                  <div>
                    <ul>
                      <li>
                        <a href="https://www.facebook.com" target="blank">
                          Facebook
                        </a>
                      </li>

                      <li>
                        <a href="http://instagram.com" target="blank">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com" target="blank">
                          YouTube
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 jus">
              <div className="col-lg-12">
                <p className="text-center  text-light">© 2024 Flavorly. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
