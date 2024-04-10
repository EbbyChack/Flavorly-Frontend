import { useState, useEffect, useRef } from "react";
import Burger from "../assets/img/Burgir 2.png";

function Eyes() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();
  const eyeRight = useRef();

  function calcAngle(element) {
    if (!element.current) return;

    let rect = element.current.getBoundingClientRect();
    let elX = rect.left + rect.width / 2;
    let elY = rect.top + rect.height / 2;

    // Calculate the angle in radians
    let rad = Math.atan2(mouseCoordinates.y - elY, mouseCoordinates.x - elX);

    // Convert radians to degrees
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
