import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/src/lib/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log("Session from HomePage")
    console.log(session);
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div>
                This is home page
            </div>
        </div>
    )
}
