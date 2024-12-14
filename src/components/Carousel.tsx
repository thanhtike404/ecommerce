'use client';
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ViewBtn from '@/components/buttons/viewBtn';

const slides = [
  { url: '/sliderImgs/img1.jpg' },
  { url: '/sliderImgs/img2.jpg' },
  { url: '/sliderImgs/img3.jpg' },
  { url: '/sliderImgs/img4.jpg' },
  { url: '/sliderImgs/img5.jpg' },
];

export default function Carousel({ banners }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full h-[85vh] relative group">
      <div
        style={{ backgroundImage: `url(${banners[currentIndex]?.imageUrl})` }}
        className="w-full h-full bg-top bg-cover duration-500 flex items-end justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-white mb-20">
          <p className="text-lg md:text-2xl">The Best Look</p>
          <h1 className="text-3xl md:text-6xl text-center font-bold">
            Anytime Anywhere
          </h1>
          <p className="text-base md:text-lg">Starts from 10,000 MMK</p>
          <ViewBtn>View</ViewBtn>
        </div>
      </div>
      {/* Left Arrow */}
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-xl px-1.5 lg:px-3 py-10 md:py-14 lg:py-20 bg-black/20 backdrop-blur-md text-white cursor-pointer border border-gray-400/50"
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-xl px-1.5 lg:px-3 py-10 md:py-14 lg:py-20 bg-black/20 backdrop-blur-md text-white cursor-pointer border border-gray-400/50"
      >
        <BsChevronCompactRight size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {banners.map((banner, slideIndex) => (
          <div
            key={banner.id}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <div
              className={`${
                slideIndex === currentIndex ? 'text-black' : 'text-grayColor'
              }`}
            >
              <RxDotFilled />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
