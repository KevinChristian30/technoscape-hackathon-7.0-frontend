"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/Button";
import { Search } from "lucide-react";
import { Skeleton } from "../ui/Skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import usePagination from "../ui/hooks/usePagination";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { constructURLSearchParams } from "@/lib/searchParams";
import { useUsers } from "@/composables/users/query/useUsers";
import {
  UserListResponse,
  UsersPaginationRequestDTO,
} from "@/services/users/listUsers.get";
import MHDError from "../domain/MHDError";
import MHDForm from "../domain/MHDFom";
import MHDTextField from "../domain/MHDTextField";
import { Badge } from "../ui/Badge";

const getColumns = (): ColumnDef<UserListResponse>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge>{row.original.role}</Badge>,
    },
  ];
};

const AgentsTable = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { pageNumber, perPage, setTotalCount, PaginationControls } =
    usePagination();
  const [name, setName] = useState<string>(searchParams.get("name") ?? "");

  const paginationDTO = new UsersPaginationRequestDTO(
    pageNumber.toString(),
    perPage.toString(),
    name
  );

  const { data, status, refetch, error } = useUsers(paginationDTO);

  useEffect(() => {
    refetch();
  }, [pageNumber, perPage, name]);

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount);
    }
  }, [data]);

  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get("name") ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newSearchParams = constructURLSearchParams({
      oldSearchParams: searchParams.toString(),
      newSearchParamKey: "name",
      newSearchParamValue: values.name,
    });
    setName(values.name);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  if (status === "pending") {
    return <Skeleton className="w-full h-96" />;
  }

  if (status === "error") {
    return <MHDError />;
  }

  return (
    <div>
      <MHDForm
        form={form}
        onFormSubmit={onSubmit}
        className="flex items-center gap-2"
      >
        <div className="w-full">
          <MHDTextField
            name="name"
            placeHolder="Search agent by name"
            control={form.control}
          />
        </div>

        <Button>
          <Search />
        </Button>
      </MHDForm>

      <div className="h-8"></div>

      <DataTable columns={getColumns()} data={data.data} />
      <PaginationControls />
    </div>
  );
};

export default AgentsTable;
