import type { NextAuthOptions } from "next-auth";

import axiosInstance from "@/lib/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH as AUTHADMIN } from "./admin-endpoints";

const maxAge = 60 * 60 * 24 * 30;
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge,
  },
  jwt: {
    maxAge,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        //  type: { label: "type", type: "text", placeholder: "admin" },
      },

      async authorize(credentials: any, req): Promise<any> {
        const signInResponse: any = await axiosInstance.post(
          credentials?.url,
          credentials
        );
        console.log(signInResponse);

        if (signInResponse.data.success) {
          const { token }: any = signInResponse?.data?.result;
          return { accessToken: token, credentials };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account }: any) {
      console.log(account);
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (!token?.accessToken) {
        return false;
      } else {
        session.accessToken = token?.accessToken;
        session.user = {
          name: token.credentials.email,
          email: token.credentials.email,
          image: undefined,
        };
        return session;
      }
    },
  },
} satisfies NextAuthOptions;
