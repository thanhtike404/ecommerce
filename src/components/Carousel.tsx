'use client';
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ViewBtn from '@/components/buttons/viewBtn';
type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'ACTIVE' | 'INACTIVE'; // Enum-like typing for status
};
export default function Carousel({ banners }: { banners: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(newIndex);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full h-[90vh] relative group overflow-hidden">
      {/* Background with overlay */}
      <div
        style={{ backgroundImage: `url(${banners[currentIndex]?.imageUrl})` }}
        className="w-full h-full bg-center bg-cover duration-700 ease-in-out relative"
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                Premium Vape Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">The Best Look</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anytime Anywhere
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Premium quality vapes starting from <span className="font-bold text-white">10,000 MMK</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Shop Now
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 rounded-full font-semibold text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <BsChevronCompactLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <BsChevronCompactRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((banner, slideIndex) => (
          <button
            key={banner.id}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              slideIndex === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-[4000ms] ease-linear"
          style={{ width: `${((currentIndex + 1) / banners.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
