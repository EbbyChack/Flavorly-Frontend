import React, { useState, useEffect } from "react";

const Sentences = () => {
  const [showSentence, setShowSentence] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // Set interval to change the sentence every 9 seconds
    const interval = setInterval(() => {
      // Transition out the text
      setIsTransitioning(true);
      // Set timeout to transition in the new text
      setTimeout(() => {
        // If the current sentence is the last one, go back to the first one
        setShowSentence((prev) => (prev < 3 ? prev + 1 : 0));
        // Reset the character index
        setCharIndex(0);
        // Transition in the new text
        setIsTransitioning(false);
      }, 500);
    }, 9000);

    // Set interval to show the characters of the sentence
    const charInterval = setInterval(() => {
      // If the character index is less than the length of the sentence, increment it
      if (charIndex < sentences[showSentence].length - 1) {
        setCharIndex((prev) => prev + 1);
      } else {
        // If the character index is equal to the length of the sentence, clear the interval
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
      {/* Add the class based on the transition state */}
      <div className={`sentence ${isTransitioning ? "transition-text-out" : "transition-text-in"}`}>
        {/* Show the characters of the sentence based on the character index */}
        {sentences[showSentence].substring(0, charIndex)}
      </div>
    </div>
  );
};

export default Sentences;
