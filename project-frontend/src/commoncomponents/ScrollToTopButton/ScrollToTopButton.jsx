import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpArrow from '/assets/up_arrow.png'; // Optional: used if you prefer image instead of SVG

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = "+919724234925"; // Replace with your number
    const message = "Hi, I'm interested in your Products!";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showButton && (
        <div
          className="fixed bottom-20 right-5 z-50 cursor-pointer p-3 bg-white rounded-full shadow-md hover:scale-110 transition topArrow"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1f467d"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L4 10H9V22H15V10H20L12 2Z" />
          </svg>
        </div>
      )}

      {/* WhatsApp Button */}
      <div
        className="fixed bottom-24 right-2 z-50 cursor-pointer p-3 bg-green-500 rounded-full shadow-md hover:scale-100 transition"
        onClick={openWhatsApp}
      >
        <img src="/assets/whatsapp-logo.png" alt="WhatsApp" className="w-7 h-7" />
      </div>
    </>
  );
};

export default ScrollToTopButton;
