import { loginUser } from "@/app/actions/auth/loginUser"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNamesObj } from "./dbConnect";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const user = await loginUser(credentials)
                console.log(user)
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)


                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                else{
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
    ],
    pages: {
        signIn: '/login',
      },
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //Console these to check necessary properties
            //console.log({ user, account, profile, email, credentials })
            if(account){
                const {providerAccountId, provider} = account;
                const{email: user_email, image, name} = user;
                const userCollection = dbConnect(collectionNamesObj.userCollection);
                const isExisted = await userCollection.findOne({providerAccountId})
                if(!isExisted){
                    const payload = {providerAccountId, provider, email: user_email, image, name}
                    await userCollection.insertOne(payload)
                }
            }
          return true
        },
    }
}