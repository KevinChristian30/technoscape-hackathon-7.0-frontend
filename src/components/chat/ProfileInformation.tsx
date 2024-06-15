import React from 'react'
import { Alert, AlertTitle } from '../ui/Alert'
import { ChevronRight, Mail } from 'lucide-react'

interface props {
    name: string,
    email: string,
    title?: string
    agent?: boolean
}


const ProfileInformation = ({ name, email, agent, title }: props) => {
    return (
        <Alert>
            <AlertTitle>
                <div className="font-lg">{title ? title : "Customer Profile Information"}</div>
            </AlertTitle>

            <div className="font-md">
                <span className="flex items-center gap-2">
                    Name
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />{" : "}
                    {name}
                </span>
            </div>
            <div className="font-md">
                <span className="flex items-center gap-2">
                    {agent ? "" : <>
                        Email
                        <Mail className="h-4 w-4 text-muted-foreground" />{" : "}
                        {email}
                    </>}
                </span>
            </div>
        </Alert>
    )
}

export default ProfileInformation