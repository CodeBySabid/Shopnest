import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosPublic from "@/lib/axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Email + Password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Backend এ password verify করো
          const res = await axiosPublic.post("/api/users/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data.success) {
            return res.data.data; // user object return করো
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // শুধু Google login এ user save করো
      if (account?.provider === "google") {
        try {
          await axiosPublic.post("/api/users", {
            name: user.name,
            email: user.email,
            image: user.image,
          });
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },

    async session({ session }) {
      if (session?.user?.email) {
        try {
          const res = await axiosPublic.get(
            `/api/users/role/${session.user.email}`
          );
          session.user.role = res.data.role;
        } catch {
          session.user.role = "user";
        }
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };