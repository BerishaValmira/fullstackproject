"use client";

import  {  useForm } from "react-hook-form";
import { z } from "zod";
import type {SubmitHandler} from "react-hook-form";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { insertContactSupportSchema, insertEntity1Schema, insertEntity2Schema } from "~/server/db/schema";
import { api } from "~/trpc/react";
import type { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import  type { Matcher } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function UpdateSupportDialog({
  open,
  setOpen,
  selectedId,
}: {
  selectedId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = api.base.getSupportContact.useQuery();

  const { data: interviewOptions } = api.base.getSupportContact.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { mutate, data, status } = api.base.updateSupportContact.useMutation({
    onSuccess: async () => {
      setOpen(false);
      await refetch();
    },
  });

  const form = useForm<z.infer<typeof insertContactSupportSchema>>({
    resolver: zodResolver(insertContactSupportSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof insertContactSupportSchema>) {
    console.log(values);
    mutate({ ...values, id: selectedId });
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
        <DialogTrigger>
          <Button>Update Contact</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update</DialogTitle>
            <DialogDescription>Fill the data to update</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 space-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">phone</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">department</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
