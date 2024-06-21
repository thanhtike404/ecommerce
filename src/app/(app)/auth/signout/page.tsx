'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const SignOutButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut({ callbackUrl: '/auth/signout' })}>
        Sign Out
      </button>
    );
  }

  return null;
};

export default SignOutButton;
