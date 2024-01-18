"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";

import largeImage1 from "../images/watch-style-shopify-desktop-banner-1.png";
import largeImage2 from "../images/shopify-home-page-desktop-banner-1 (1).png";

import smallImage1 from "../images/watch-style-shopify-desktop-banner-1 (2).png";
import smallImage2 from "../images/shopify-home-page-desktop-banner-1.png";

const Banner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const largeImages = [largeImage1, largeImage2];
  const smallImages = [smallImage1, smallImage2];
  const intervalDuration = 10000;

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % (isMobile ? smallImages.length : largeImages.length)
      );
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, isMobile]);

  const images = isMobile ? smallImages : largeImages;

  return (
    <div className="relative w-full overflow-hidden h-72 sm:h-96 mb-4">
      <div>
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          fill={true}
          layout="fill"
        />

        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-500"
          onClick={() =>
            setCurrentImageIndex(
              (currentImageIndex - 1 + images.length) % images.length
            )
          }
        >
          {"<"}
        </div>

        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-500"
          onClick={() =>
            setCurrentImageIndex((currentImageIndex + 1) % images.length)
          }
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Banner;
