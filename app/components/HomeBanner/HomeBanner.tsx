'use client'

import Image, { StaticImageData } from "next/image";
import image1 from '../images/IMG_0523.jpg'
import image2 from '../images/watch_2.jpg'
import image3 from '../images/IMG_0523.jpg'


// components/HomeBanner.tsx

// components/HomeBanner.tsx

// components/HomeBanner.tsx

// components/HomeBanner.tsx

// components/HomeBanner.tsx

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';



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
    // Przewijanie obrazów co 10 sekund
    const intervalId = setInterval(goToNextImage, intervalDuration);

    // Czyszczenie interwału przy odmontowywaniu komponentu
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <div className="relative w-full h-96">
      <div
        className="w-full h-full bg-cover bg-center relative transition-opacity duration-1000 rounded-md"
        style={{
          backgroundImage: `url(${images[currentImageIndex].src})`,
          opacity: 1, // Początkowa wartość przezroczystości
        }}
      >
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
