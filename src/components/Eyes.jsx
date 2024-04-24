import { useState, useEffect, useRef } from "react";
import Burger from "../assets/img/Burgir 2.png";

function Eyes() {
  // Create a state to store the mouse coordinates
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  // Create refs for the eyes elements to get their position
  const eyeLeft = useRef();
  const eyeRight = useRef();

  // Function to calculate the angle of the eyes based on the mouse position
  function calcAngle(element) {
    // Check if the element exists
    if (!element.current) return;

    // Get the center of the element
    let rect = element.current.getBoundingClientRect(); //Returns the size of an element and its position relative to the viewport
    let elX = rect.left + rect.width / 2;
    let elY = rect.top + rect.height / 2;

    // Calculate the angle based on the mouse position
    let rad = Math.atan2(mouseCoordinates.y - elY, mouseCoordinates.x - elX);

    // Convert the angle from radians to degrees
    let deg = rad * (180 / Math.PI);

    // Adjust the rotation angle based on the position of the mouse
    let rot;
    if (mouseCoordinates.x >= elX) {
      rot = -(90 - deg);
    } else {
      rot = 90 - deg;
    }

    // Adjust rotation further if mouse is below or above the eye level
    if (mouseCoordinates.y < elY) {
      rot += 180; // Reverse rotation if mouse is above eye level
    }

    if (mouseCoordinates.x >= elX) {
      rot = -(90 - deg);
    }

    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="allContainer">
      <div className="burgerContainer">
        <img src={Burger} alt="burger" className="burgerImg" />
        <div className="eye_container">
          <div
            ref={eyeLeft}
            style={{
              transform: `rotate(${calcAngle(eyeLeft)}deg)`,
            }}
            className="eye"
          ></div>
          <div
            ref={eyeRight}
            style={{
              transform: `rotate(${calcAngle(eyeRight)}deg)`,
            }}
            className="eye"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Eyes;
