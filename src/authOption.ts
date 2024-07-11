import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaClient from '@/lib/db';

export const authOptions = {
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
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        console.log(credentials);

        try {
          if (
            credentials?.email == 'admin@gmail.com' &&
            credentials?.password == '123'
          ) {
            // Any object returned will be saved in `user` property of the JWT

            // const isValid = await compare(credentials?.password, user.password);

            return credentials;
          }
          return Promise.reject(new Error('Invalid credentials'));
        } catch (error) {
          return Promise.reject(new Error('Invalid credentials'));
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }: { session: any; token: any; user: any }) {
      return session; // The return type will match the one returned in `useSession()`
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
