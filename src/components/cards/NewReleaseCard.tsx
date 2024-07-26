import React from 'react';
import Image from 'next/image';

const cards = [
  { background: '#F5DD61', src: '/cardImgs/vape1.png' },
  { background: '#FF55BB', src: '/cardImgs/vape2.png' },
  { background: '#A1EEBD', src: '/cardImgs/vape3.png' },
  { background: '#7BD3EA', src: '/cardImgs/vape4.png' },
];

export default function NewReleaseCard({ bestSellingProds }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {bestSellingProds.map((card, index) => (
        <div
          key={index}
          style={{ backgroundColor: card.background }}
          className="relative h-[250px] flex flex-col items-start justify-between text-black rounded-xl p-4 shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="flex-grow">
            <h3 className="font-semibold text-xl mb-2 leading-tight">
              Citrus Mon <br /> 2000 Pul <br />
              Disposable <br />3 Percent
            </h3>
            <p className="text-lg">{card.price} MMK</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <Image
              src={card.imageUrl}
              alt="vape"
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
