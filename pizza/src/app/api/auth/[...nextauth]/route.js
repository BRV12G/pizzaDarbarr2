import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import {User} from "@/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
// import NextAuth, {getServerSession} from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";


export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const PasswordOk = user && bcrypt.compareSync(password, user.password);
          
          // console.log(user);
          // console.log(PasswordOk);

          if(PasswordOk) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null
        }
      })

  ],
}



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }