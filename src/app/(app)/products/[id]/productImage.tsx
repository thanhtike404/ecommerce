'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './style.css';
import { useSession } from 'next-auth/react';

function ProductImage({ mainImage, images }) {
  const session = useSession();
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    console.log(session, 'session');
  }, [session]);

  useEffect(() => {
    const magnifierGlass = magnifierRef.current;
    const img = imgRef.current;

    function magnify(img, magnifierGlass) {
      let w, h, bw;
      magnifierGlass.style.backgroundImage = `url(${img.src})`;
      magnifierGlass.style.backgroundRepeat = 'no-repeat';
      magnifierGlass.style.backgroundSize = `${img.width * 2}px ${
        img.height * 2
      }px`;
      bw = 3;
      w = magnifierGlass.offsetWidth / 2;
      h = magnifierGlass.offsetHeight / 2;

      function moveMagnifier(e) {
        let pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        if (x > img.width - w / 2) {
          x = img.width - w / 2;
        }
        if (x < w / 2) {
          x = w / 2;
        }
        if (y > img.height - h / 2) {
          y = img.height - h / 2;
        }
        if (y < h / 2) {
          y = h / 2;
        }
        magnifierGlass.style.left = `${x - w}px`;
        magnifierGlass.style.top = `${y - h}px`;
        magnifierGlass.style.backgroundPosition = `-${x * 2 - w + bw}px -${
          y * 2 - h + bw
        }px`;
      }

      function getCursorPos(e) {
        let a,
          x = 0,
          y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }

      magnifierGlass.addEventListener('mousemove', moveMagnifier);
      img.addEventListener('mousemove', moveMagnifier);
      magnifierGlass.addEventListener('mouseout', () => {
        magnifierGlass.style.opacity = 0;
      });
      magnifierGlass.addEventListener('mouseover', () => {
        magnifierGlass.style.opacity = 1;
      });
    }

    if (img && magnifierGlass) {
      magnify(img, magnifierGlass);
    }
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center m-4">
      <h1>
        Session {session.data?.user?.name} {session.data?.user?.email}
      </h1>
      {mainImage && (
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full  mb-4"
        >
          <div className="img-magnifier-container">
            <Image
              width={500}
              height={500}
              id="myimage"
              src={selectedImage}
              alt="product"
              className="w-full h-full object-cover rounded-lg shadow-md"
              ref={imgRef}
            />
            <div ref={magnifierRef} className="img-magnifier-glass"></div>
          </div>
        </motion.div>
      )}
      {images && (
        <div className="flex space-x-4 mt-4 overflow-x-auto">
          {images.map((image) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(image.imageUrl)}
              className="cursor-pointer"
            >
              <Image
                width={100}
                height={100}
                src={image.imageUrl}
                alt="product thumbnail"
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImage;
