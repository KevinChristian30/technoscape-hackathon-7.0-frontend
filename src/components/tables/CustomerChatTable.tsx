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
import { CustomerListResponse, CustomersPaginationRequestDTO } from "@/services/users/listCustomers.get";
import { useCustomers } from "@/composables/users/query/useCustomers";
import { log } from "console";

const getColumns = (): ColumnDef<CustomerListResponse>[] => {
    return [
        {
            accessorKey: "roomId",
            header: "Room ID",
        },
        {
            accessorKey: "customerName",
            header: "Name",
        },
        {
            accessorKey: "customerEmail",
            header: "Email",
        },
        {
            accessorKey: "state",
            header: "State",
        },
        {
            accessorKey: "agentId",
            header: "Agent Id",
        },
        {
            accessorKey: "createdAt",
            header: "Created at",
        },
    ];
};

interface props {
    refresh: boolean;
}

const CustomerChatTable = ({ refresh }: props) => {

    const { pageNumber, perPage, setTotalCount, PaginationControls } =
        usePagination();

    const paginationDTO = new CustomersPaginationRequestDTO(
        pageNumber.toString(),
        perPage.toString()
    );

    const { data, status, refetch, error } = useCustomers(paginationDTO);
    let intervalId: NodeJS.Timeout;

    useEffect(() => {
        refetch();
    }, [pageNumber, perPage]);

    useEffect(() => {
        if (data) {
            setTotalCount(data.totalCount);
        }
    }, [data]);


    useEffect(() => {

        if (refresh) {
            console.log("Refreshing");

            refetch();
            intervalId = setInterval(refetch, 0.25 * 60 * 1000); // Fetch every 2 minutes
        }

        return () => clearInterval(intervalId);
    }, [refresh]);




    if (status === "pending") {
        return <Skeleton className="w-full h-96" />;
    }

    if (status === "error") {
        return <MHDError />;
    }

    return (
        <div>
            <DataTable columns={getColumns()} data={data.data} />
            <PaginationControls />
        </div>
    );
};

export default CustomerChatTable;
