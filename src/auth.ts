import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail, createUser } from './lib/dbUtils';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the user exists in the database
      const existingUser = await getUserByEmail(user.email as string);

      if (existingUser) {
        // If user exists, use the role from the database
        user.role = existingUser.role;
      } else {
        // If new user, assign role (default or based on email)
        const role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';

        // Create a new user
        await createUser({
          name: user.name as string,
          email: user.email as string,
          image: user.image as string,
          role,
        });

        // Assign role to user
        user.role = role;
      }

      return true; // Sign-in success
    },

    async session({ session, token }) {
      // Attach role to the session object
      session.user.role = token.role;
      return session;
    },

    async jwt({ token, user }) {
      // If a user object exists, add role to JWT
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

export const getSession = () => getServerSession(authOptions);
