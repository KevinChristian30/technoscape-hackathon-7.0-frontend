"use client";

import React, { useEffect, useState } from "react";
import LeftEmailSection from "./LeftEmailSection";
import RightEmailSection from "./RightEmailSection";
import { useEmails } from "@/composables/emails/query/useEmails";
import { EmailsPaginationRequestDTO } from "@/services/email/listEmails.get";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import usePagination from "@/components/ui/hooks/usePagination";

const EmailSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { pageNumber, perPage, setTotalCount, PaginationControls } =
    usePagination();
  const [name, setName] = useState<string>(searchParams.get("name") ?? "");

  const paginationDTO = new EmailsPaginationRequestDTO(
    pageNumber.toString(),
    perPage.toString(),
    name
  );

  const { data, status, refetch, error } = useEmails(paginationDTO);

  useEffect(() => {
    refetch();
  }, [pageNumber, perPage, name]);

  useEffect(() => {
    if (data) {
      setTotalCount(0);
    }
  }, [data]);

  return (
    <div className="w-full flex h-full">
      <LeftEmailSection />
      <RightEmailSection />
    </div>
  );
};

export default EmailSection;
