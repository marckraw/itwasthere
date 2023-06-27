import { useSession, signIn, signOut } from "next-auth/react"

const AccessToken = () => {
    const { data } = useSession()
    const { accessToken } = data as any

    return <div>Access Token: {accessToken}</div>
}