import React from 'react';
import Image from 'next/image';

const cards = [
  { background: '#F5DD61', src: '/cardImgs/vape1.png' },
  { background: '#FF55BB', src: '/cardImgs/vape2.png' },
  { background: '#A1EEBD', src: '/cardImgs/vape3.png' },
  { background: '#7BD3EA', src: '/cardImgs/vape4.png' },
];

const gradients = [
  'from-yellow-400 to-orange-500',
  'from-pink-400 to-red-500', 
  'from-green-400 to-teal-500',
  'from-blue-400 to-cyan-500',
];

export default function NewReleaseCard({ bestSellingProds }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {bestSellingProds.map((product, index) => (
        <div
          key={index}
          className={`group relative h-[320px] bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div>
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-4">
                Best Seller #{index + 1}
              </div>
              <h3 className="font-bold text-xl mb-3 leading-tight">
                {product.name || 'Premium Vape'}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold">{product.price}</span>
                <span className="text-sm opacity-90">MMK</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-colors">
                View Details
              </button>
              <div className="w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={product.imageUrl}
                  alt={product.name || 'vape'}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
