"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const usePagination = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState<number>(
    parseInt(searchParams.get("pageNumber") ?? "1")
  );
  const [perPage, setPerPage] = useState<number>(
    parseInt(searchParams.get("perPage") ?? "10")
  );
  const [totalCount, setTotalCount] = useState<number>(0);

  const hasPreviousPage: boolean = useMemo(() => pageNumber > 1, [pageNumber]);
  const hasNextPage: boolean = useMemo(
    () => pageNumber < Math.ceil(totalCount / perPage),
    [pageNumber, totalCount, perPage]
  );

  const prevPage = () => {
    const newPageNumber = Math.max(pageNumber - 1, 1);
    setPageNumber(newPageNumber);

    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", newPageNumber.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const nextPage = () => {
    const newPageNumber = Math.min(
      pageNumber + 1,
      Math.ceil(totalCount / perPage)
    );
    setPageNumber(newPageNumber);

    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", newPageNumber.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("perPage", perPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  }, [perPage]);

  const PaginationControls = () => {
    return (
      <div className="w-full flex gap-2 items-center justify-end">
        <Select
          value={perPage.toString()}
          onValueChange={(e) => setPerPage(parseInt(e))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Per Page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 25, 50, 100].map((number) => {
              return (
                <SelectItem key={number} value={number.toString()}>
                  {number}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
          <Button variant="outline" onClick={nextPage} disabled={!hasNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  };

  return {
    pageNumber,
    perPage,
    setTotalCount,
    PaginationControls,
  };
};

export default usePagination;
