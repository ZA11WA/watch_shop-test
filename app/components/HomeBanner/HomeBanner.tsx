'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

import image1 from '../images/banner1.png';
import image2 from '../images/standard.gif';
import image3 from '../images/standard-15.gif';


const HomeBanner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const images = [image1, image2, image3];
  const intervalDuration = 10000;

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(previousIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, intervalDuration);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className=""
      >
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          fill={true}
        
        />

        {/* Strzałka w lewo */}
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl"
          onClick={goToPreviousImage}
        >
          {"<"}
        </div>

        {/* Strzałka w prawo */}
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl"
          onClick={goToNextImage}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
