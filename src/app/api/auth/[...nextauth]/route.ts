import axiosPublic from "@/lib/axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            try {
                await axiosPublic.post("/api/users", {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                })
                return true;
            }
            catch (error) {
                console.log("Error saving user:", error);
                return true;
            }
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
                } catch (error) {
                    console.error("Error fetching role:", error);
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
})

export { handler as GET, handler as POST };