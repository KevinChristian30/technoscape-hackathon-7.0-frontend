import CreateAgentForm from "@/components/forms/CreateAgentForm";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/layouts/PageLayout";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";

const Page = () => {
  return (
    <PageLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/agents">Agents</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Agent</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="h-16"></div>

      <PageLayoutContent className="grid place-content-center">
        <CreateAgentForm />
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Page;
