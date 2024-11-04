// import { client } from "@/sanity/lib/client";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
// import { writeClient } from "@/sanity/lib/write.client";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  //   callbacks: {
  //     async signIn({ user, account, profile, email, credentials }) {
  //       console.log({ user, account, profile, email, credentials }, "<----disignIn");

  //       const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
  //         id: profile?.id,
  //       });

  //       if (!existingUser) {
  //         await writeClient.create({
  //           _type: "author",
  //           id: profile?.id,
  //           name: user?.name,
  //           username: profile?.login,
  //           email: user?.email,
  //           image: user?.image,
  //           bio: profile?.bio,
  //         });
  //       }

  //       return true;
  //     },
  //     async jwt({ token, user, account, profile }) {
  //       console.log({ token, user, account, profile }, "<----dijwtAuth");

  //       if (account && profile) {
  //         const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
  //           id: profile?.id,
  //         });

  //         if (!user) {
  //           token.id = user?._id;
  //         }
  //       }

  //       return token;
  //     },
  //     async session({ session, token, user }) {
  //       console.log({ session, token, user }, "<----disessionAuth");

  //       Object.assign(session, {
  //         id: token?.id,
  //       });

  //       return session;
  //     },
  //   },
});
