import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaClient from '@/lib/db';
import * as Sentry from '@sentry/nextjs';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        // Make sure your user model has a role field
      }
      return token;
    },
    async session({ session, token }) {
      // Add token values to session
      session.user.id = token.id;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },

  async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    // Redirect to the homepage or any other page after sign-in
    return baseUrl; // Always return the base URL
  },
};

export default authOptions;
