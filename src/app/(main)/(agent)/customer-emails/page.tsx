import EmailTable from "@/components/domain/email/EmailTable";
import { PageLayout, PageLayoutHeader } from "@/components/layouts/PageLayout";
import React from "react";

const Page = () => {
  return (
    <PageLayout>
      <PageLayoutHeader className="flex justify-between items-center w-full">
        Emails
      </PageLayoutHeader>

      <div className="h-8"></div>
      <EmailTable />
    </PageLayout>
  );
};

export default Page;
