import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaClient from '@/lib/db';
const handler = NextAuth({
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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.email = user.email;
        // Make sure your user model has a role field
      }
      return token;
    },
    async session({ session, token }) {
      // Add token values to session
      session?.user.email = token.email;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    return baseUrl; // Always return the base URL
  },
});

export { handler as GET, handler as POST };
