import {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || " ",
            clientSecret: process.env.GITHUB_SECRET || " ",
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn(data) {
            const {user, profile}  = data

            const isAllowedToSignIn = user.name === process.env.ADMIN_NAME && user.email === process.env.ADMIN_EMAIL && (profile as any).url === process.env.ADMIN_PROFILE_URL

            if(isAllowedToSignIn) {
                return true
            } else {
                return false
            }

        },
        // async redirect({ url, baseUrl }) {
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async session(data) {
            // Attaching saved in first jwt run data to additional data variable
            // and then attaching it to session
            const additionalData = {
                profile_url: data.token.profile_url,
                accessToken: data.token.accessToken,
            }
            const dataSession: any = data.session as any
            dataSession.additionalData = additionalData

            return dataSession
        },
        async jwt({token, profile, account}) {
            // saving in first run url from github
            if (profile) {
                token.profile_url = (profile as any).url
            }

            // saving in first run access token from github
            if (account) {
                token.accessToken = account.access_token
            }

            return token
        },
    },
};