import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const token = jwt.sign(profile, process.env.NEXT_AUTH_TOKEN_SECRET);
        return `/register/google?token=${token}`;
      } catch (error) {
        
      }
    },
  },
});


