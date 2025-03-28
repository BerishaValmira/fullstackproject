"use client";

import { DataTable } from "~/components/ui/data-table";
import AddSupportDialog from "./add-support-dialog";
import { api } from "~/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ContactSupport, contactSupport } from "~/server/db/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import UpdateSupportDialog from "./update-support-dialog";
import { useState } from "react";

export default function SupportContact() {
  const [open, setOpen] = useState(false);

  const [id, setId] = useState<number>(0);

  const { data, isLoading, refetch } = api.base.getSupportContact.useQuery();

  const { mutate: remove } = api.base.deleteSupportContact.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const columns: ColumnDef<ContactSupport>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
   
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
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
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setId(row.original.id);
                }}
              >
                update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const { data: interviewOptions } = api.base.getSupportContact.useQuery();

  const {
    mutate,
    data: filteredData,
    isSuccess,
    reset,
  } = api.base.filterEntity2.useMutation();

  return (
    <div className="flex flex-col py-8">
      <div className="flex justify-left w-full p-8 gap-4">
        <AddSupportDialog />
        <UpdateSupportDialog open={open} setOpen={setOpen} selectedId={id} />
        <Input
          onChange={(value) => {
            mutate({ type: value.target.value });
          }}
        />
        <Button disabled={!isSuccess} onClick={() => reset()}>
          Remove filter
        </Button>
      </div>
      <div className="container mx-auto">
        {isLoading && "Loading..."}
        {data && (
          // <DataTable columns={columns} data={isSuccess ? filteredData : data} />
          <DataTable
            columns={columns}
            data={
              isSuccess
                ? filteredData.map(item => ({
                    id: item.id,
                    name: item.name,
                    email: null,
                    phone: null,
                    department: '',
                  }))
                : data
            }
          />
        )}
      </div>
    </div>
  );
}
