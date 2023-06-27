'use client'

import {useEffect, useState} from "react";
import {Spinner} from "@/src/components/Spinner/Spinner";
import {linearService} from "@/src/services/linear/linear.service";

const Linear = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const me = await linearService.getMe()
            const assignedIssues = await me.assignedIssues()
            const org = await linearService.getMyOrg()
            const issues = await linearService.getMyIssues()
            const projects = await linearService.getProjects()
            const selectedProjects = await linearService.getProjectByNames(['hikeit', 'Anton and Active Brain', 'Live Streaming and Youtube', 'Smart Mirror with ChatGPT voice assistant'])

            const allCurrentIssues = await Promise.all(selectedProjects.nodes.map(async project => {
                return await project.issues()
            }))



            console.log(`${me.displayName} created '${me.createdIssueCount}' issues in ${org.name}`)

            console.log({me, org, issues, projects, selectedProjects, allCurrentIssues})

            setData(issues.nodes)
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
                                    <div key={item.title}>{item.title}</div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Linear