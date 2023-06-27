'use client'

import {useEffect, useState} from "react";
import {Spinner} from "@/src/components/Spinner/Spinner";
import {todoistService} from "@/src/services/todoist/todoist.service";

const Todoist = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const projects = await todoistService.getProjects()

            console.log(projects)

            setData(projects)
        })()
    }, [])

    if(!data) return <Spinner />

    return (
        <div className={"text-orange-500"}>
            {
                data.length > 0 ? (
                    <div>
                        {
                            data.map(item => {
                                return (
                                    <div key={item.name}>{item.name}</div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Todoist