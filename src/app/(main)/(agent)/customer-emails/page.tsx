import EmailSection from "@/components/domain/email/EmailSection";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/layouts/PageLayout";
import React from "react";

const Page = () => {
  return (
    <PageLayout>
      <PageLayoutHeader className="flex justify-between items-center w-full">
        Emails
      </PageLayoutHeader>

      <div className="h-8"></div>

      <PageLayoutContent className="w-full">
        <EmailSection />
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Page;
