
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
              const { username, password, formType } = credentials as { username: string, password: string, formType: string };

              if (formType == "Register") {
                const res = await fetch('http://50.50.50.40:6666/api/auth/login', {
                  method: 'POST',
                  headers: { 
                    'X-Powered-By': 'Express',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                   },
                  body: JSON.stringify({ username, password })
                });

                if (!res.ok) {
                      throw new Error("Register gagal" + res);
                }
                const user = await res.json();
                if (res.ok && user) {
                  return user;
                }
                return null;

              } else {
                // login
                const res = await fetch('http://50.50.50.40:6666/api/auth/login', {
                  method: 'POST',
                  headers: { 
                    'X-Powered-By': 'Express',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                  body: JSON.stringify({ username, password })
                });

                if (!res.ok) {
                    throw new Error("Login gagal" +res);
                }

                const user = await res.json();
                if (res.ok && user) {
                  return user;
                }
                // gagal
                return null;
              }
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
    pages : {
        signIn: 'login'
    }
}

const handler = NextAuth(authOptions);

export {
    handler as GET, handler as POST
}