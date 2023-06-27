import React, {FC, ReactNode} from "react";
import {Header} from "../components/Header/Header";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

interface MainLayoutProps {
    children: ReactNode
}

const MainProtectedLayout: FC<MainLayoutProps> = ({children}) => {
    const data = useSession()
    const router = useRouter()

    if(data.status === 'unauthenticated') {
        if(typeof window !== 'undefined') {
            router.push("/api/auth/signin")
        }
    }

    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}

export {MainProtectedLayout}