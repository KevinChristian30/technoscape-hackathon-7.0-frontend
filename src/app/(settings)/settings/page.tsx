import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"

import { Input } from "@/components/ui/Input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { RocketIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"


export default function Dashboard() {
    return (
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Make Your Profile More Exciting!</AlertTitle>
                <AlertDescription>
                    You can also configure the settings here
                </AlertDescription>
            </Alert>


            <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle id="profile">Account</CardTitle>
                        <CardDescription>
                            Email used for your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input placeholder="Email" disabled value={"josafatandersonyo@gmail.com"} />
                        </form>
                    </CardContent>

                </Card>
                <Card x-chunk="dashboard-04-chunk-2">
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Input
                                placeholder="Current Password"
                                type="password"
                            />
                            <Input
                                placeholder="New Password"
                                type="password"
                            />
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Update</Button>
                    </CardFooter>
                </Card>

                <Card x-chunk="dashboard-04-chunk-3">
                    <CardHeader>
                        <CardTitle id="settings">Bio</CardTitle>
                        <CardDescription>
                            A short description about you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input placeholder="bioo" />
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
