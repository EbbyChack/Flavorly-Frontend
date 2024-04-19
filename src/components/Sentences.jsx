import React, { useState, useEffect } from "react";

const Sentences = () => {
  const [showSentence, setShowSentence] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowSentence((prev) => (prev < 3 ? prev + 1 : 0));
        setCharIndex(0);
        setIsTransitioning(false);
      }, 500);
    }, 9000);

    const charInterval = setInterval(() => {
      if (charIndex < sentences[showSentence].length - 1) {
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(charInterval);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      clearInterval(charInterval);
    };
  }, [showSentence]);

  const sentences = [
    "Dive into a world where every dish tells a story and every flavor ignites a sensation.",
    "Whether you're a culinary enthusiast, an adventurous foodie, or simply seeking to elevate your palate.",
    "Our team of seasoned chefs and food experts is dedicated to bringing you the finest culinary experiences.",
    "So, just lay back and savor the flavor!",
  ];

  return (
    <div className="container">
      <div className={`sentence ${isTransitioning ? "transition-text-out" : "transition-text-in"}`}>
        {sentences[showSentence].substring(0, charIndex)}
      </div>
    </div>
  );
};

export default Sentences;
