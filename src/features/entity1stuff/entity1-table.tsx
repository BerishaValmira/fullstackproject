"use client";

import { DataTable } from "~/components/ui/data-table";
import AddEntity1Dialog from "./add-entity1-dialog";
import { api } from "~/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Entity1 } from "~/server/db/schema";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Entity1Table() {
  // const [date, setDate] = useState<Date>(new Date(Date.now()));

  const { data, isLoading, refetch } = api.base.getEntity1.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  

  // const { mutate: remove } = api.base.deleteEntity1.useMutation({
  //   onSuccess: () => refetch(),
  // });

   const { mutate: remove } = api.base.deleteEntity1.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });

  // const {
  //   mutate,
  //   data: filteredData,
  //   isSuccess,
  //   reset,
  // } = api.base.filterEntity1.useMutation({});

  const columns: ColumnDef<Entity1>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "surname",
        header: "Surname",
      },
      {
        accessorKey: "birthyear",
        header: "Birthyear",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 ">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    remove(row.original.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [remove]);

  return (
    <div className="flex flex-col py-8">
      <div className="flex justify-left w-full p-8 gap-4">
    
        <AddEntity1Dialog />
{/*      
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                date && setDate(date);
                // date && mutate({ date: date.toISOString() });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover> */} 
        {/* <Button disabled={isLoading} onClick={() => refetch()}>
          Remove filter
        </Button> */}
      </div>
      {/* <div className="flex-1 overflow-y-auto px-9 py-7 max-h-[70vh]"> */}
      <div className="container mx-auto">
        {isLoading && "Loading..."}
        {data && (
          <DataTable columns={columns} data={data} />
          // <DataTable
          //   columns={columns}
          //   data={isSuccess ? filteredData : data}
          // />
        )}
      </div>
    </div>
  );
}

//test comment
