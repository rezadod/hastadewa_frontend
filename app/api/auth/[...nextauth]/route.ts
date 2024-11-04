
// import { CekUsers } from "@/lib/firebase/services";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions ={
    session: {
        strategy: 'jwt',
    },
    secret: "EWd20O7BLuV90JqoeDRqHFxB7mOzQxk/FNZqxk5riRY=",
    providers: [
        CredentialsProvider({
            name: 'Login',
            credentials: {
              username: { label: 'Username', type: 'text' },
              password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
              const { username, password } = credentials as { username: string, password: string };
      
              // ngirim username password ke api
              const res = await fetch('https://example.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
              });

              //berhasil
              const user = await res.json();
              if (res.ok && user) {
                return user;
              }
              // gagal
              return null;
            }
          })
    ],
    callbacks: {
        async jwt({ token, user }) {
          // menambah informasi user ke jwt
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
        if (session.user) {
            // menambah data ke session
            session.user.name = token.name;
            session.user.email = token.email;
        }
        return session;
        }
    },
}

const handler = NextAuth(authOptions);

export {
    handler as GET, handler as POST
}