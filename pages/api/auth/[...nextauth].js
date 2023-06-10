import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

export const options = {
providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: "1", name: credentials.username, password: credentials.password }

      if (credentials.password === 'password123' && credentials.username === 'Mwikali') {
        // Any object returned will be saved in `user` property of the JWT
        return {
          id: user.id,
          name: user.name,
        }
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),
],

}

export default NextAuth(options)