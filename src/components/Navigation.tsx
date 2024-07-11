'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import CartSlider from '@/components/CartSlider';
import useCartStore from '@/store/home/cartStore';

import UserMenu from './userMenu';
export default function Navigation() {
  const cart = useCartStore((state) => state?.cart || 0);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full flex items-center align-middle justify-between px-5 md:px-14 lg:px-36 py-2 md:py-4 z-50 transition-colors duration-300 ${
        scrolling
          ? 'bg-black/60 backdrop-blur-md text-white'
          : 'bg-white text-black'
      }${
        navMenuOpen ? ' h-screen bg-black/60 backdrop-blur-md text-white' : ''
      }`}
      style={{ height: 'auto', minHeight: '60px' }} // Ensure a fixed height
    >
      <Link
        href={'/'}
        className={`font-bold ${
          scrolling || navMenuOpen ? 'text-white' : 'text-black'
        } text-xl md:text-2xl`}
      >
        PI Vape
      </Link>

      <div
        className={`flex items-center gap-6 pt-2 ${
          scrolling || navMenuOpen ? 'text-white' : 'text-black'
        }`}
      >
        <Link href={'/products'}>Products</Link>
        <Link href={'/checkout'}>Checkout</Link>

        <Link href={'/orders'}>Orders</Link>
        {session ? '' : <Link href={'/auth/signin'}>Login</Link>}
        <div className="flex">
          <CartSlider />
        </div>
        {session && <UserMenu user={session.user} />}
      </div>
    </nav>
  );
}
