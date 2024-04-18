import React, { useState, useEffect } from "react";

const Sentences = () => {
  const [showSentence, setShowSentence] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowSentence((prev) => (prev < 3 ? prev + 1 : 0));
        setIsTransitioning(false);
      }, 500);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const sentences = [
    "Dive into a world where every dish tells a story and every flavor ignites a sensation.",
    "Whether you're a culinary enthusiast, an adventurous foodie, or simply seeking to elevate your palate.",
    "Our team of seasoned chefs and food experts is dedicated to bringing you the finest culinary experiences, transforming ordinary meals into extraordinary delights.",
    "So, just layback and savor the flavor!",
  ];

  return (
    <div className="container">
      <div className={`sentence ${isTransitioning ? "transition-text-out" : "transition-text-in"}`}>{sentences[showSentence]}</div>
    </div>
  );
};

export default Sentences;
