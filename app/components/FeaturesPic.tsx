import React from 'react';
import { useState, ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturesPic = () => {

  // SLIDESHOW
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
      'f-scorecard.png', 
      'f-stratmap.png',
      'f-swot.png',
      'f-report.png',
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      <div className="m-[5rem_0_0.8rem_30rem] items-center justify-center inline-block text-center break-words font-extrabold text-[3.8rem] text-[#FFFFFF]">
        Get a sneak peek into our <span className="powerful-features-text">powerful <br/>features.</span> 
      </div>

      <div className="container-29 hidden gap-20 lg:flex">
          <div className="white-container-features">
          <div className="slide">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </div>
          </div>
      </div>

    </div>
  )
}

export default FeaturesPic