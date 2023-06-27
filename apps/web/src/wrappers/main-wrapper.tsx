import React from "react";
import {Header} from "@/src/components/Header/Header";
import {NextAuthProvider} from "@/src/providers/next-auth.provider";

export const MainWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <NextAuthProvider>
                <Header />
                <main>
                    {children}
                </main>
            </NextAuthProvider>
        </>
    )
}