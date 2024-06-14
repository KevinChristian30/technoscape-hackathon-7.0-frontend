import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/layouts/PageLayout";
import AgentsTable from "@/components/tables/AgentsTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <PageLayout>
      <PageLayoutHeader className="flex justify-between items-center w-full">
        Agents
        <Link href={"/agents/create"}>
          <Button className="flex items-center gap-2" size={"sm"}>
            <Plus /> Add Agent
          </Button>
        </Link>
      </PageLayoutHeader>

      <div className="h-8"></div>

      <PageLayoutContent>
        <AgentsTable />
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Page;
