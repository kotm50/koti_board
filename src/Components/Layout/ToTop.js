import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlineArrowUp } from "react-icons/ai";

function ToTop() {
  const [showButton, setShowButton] = useState(false);
  const thisLocation = useLocation();

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };

    // eslint-disable-next-line
  }, [thisLocation]);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          className="fixed p-2 drop-shadow-lg bottom-5 right-5 bg-white  hover:text-white hover:bg-indigo-500 border border-gray-200 hover:border-0 rounded-full"
          onClick={e => scrollToTop()}
          style={{ zIndex: "99999999999" }}
        >
          <AiOutlineArrowUp />
        </button>
      )}
    </>
  );
}

export default ToTop;
