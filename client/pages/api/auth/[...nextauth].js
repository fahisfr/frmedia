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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      const token = jwt.sign({ token: account?.id_token }, process.env.NEXTAUTH_TOKEN_SECRET, {
        expiresIn: "5m",
      });
      return `/register/google?token=${token}`;
    },
  },
});
