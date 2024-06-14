"use client";

import { PageLayout, PageLayoutHeader } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";
import { useUser } from "@/providers/UserProvider";

export default function Page() {
  const { email } = useUser();

  return (
    <PageLayout>
      <PageLayoutHeader>Settings</PageLayoutHeader>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle id="profile" className="text-lg">
                Account
              </CardTitle>
              <CardDescription>Email used for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Email" disabled value={email} />
              </form>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle className="text-lg">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Input placeholder="Current Password" type="password" />
                <Input placeholder="New Password" type="password" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Update</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
