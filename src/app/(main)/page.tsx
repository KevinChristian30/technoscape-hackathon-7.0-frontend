"use client";
import { PageLayout, PageLayoutHeader } from "@/components/layouts/PageLayout";
import { useUser } from "@/providers/UserProvider";

const Page = () => {
  const { name } = useUser();
  return (
    <PageLayout>
      <PageLayoutHeader>Welcome {name}</PageLayoutHeader>
    </PageLayout>
  );
};

export default Page;
