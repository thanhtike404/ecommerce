import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaClient from '@/lib/db';
import * as Sentry from '@sentry/nextjs';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          Sentry.captureException(new Error('No credentials provided'));
          throw new Error('No credentials provided');
        }
        const { email, password } = credentials;

        try {
          if (email === 'admin@gmail.com' && password === '123') {
            return { email };
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          Sentry.captureException(error);
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
