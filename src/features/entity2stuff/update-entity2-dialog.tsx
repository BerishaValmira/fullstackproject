"use client";

import  {  useForm } from "react-hook-form";
import type { z } from "zod";
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
import { insertEntity2Schema } from "~/server/db/schema";
import { api } from "~/trpc/react";
import type { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";


export default function UpdateEntity2Dialog({
  open,
  setOpen,
  selectedId,
}: {
  selectedId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = api.base.getEntity2.useQuery();

 api.base.getEntity1.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { mutate } = api.base.updateEntity2.useMutation({
    onSuccess: async () => {
      setOpen(false);
      await refetch();
    },
  });

  const form = useForm<z.infer<typeof insertEntity2Schema>>({
    resolver: zodResolver(insertEntity2Schema),
    defaultValues: {
      // isPassed: false,
      type: "",
      name: "",
      number: "0",
      // note:""
    },
  });

  function onSubmit(values: z.infer<typeof insertEntity2Schema>) {
    console.log(values);
    mutate({ ...values, id: selectedId });
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
        <DialogTrigger>
          <Button>Update Publisher</Button>
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
                    {/* <Checkbox
                      checked={field.value ? field.value : undefined}
                      onCheckedChange={field.onChange}
                    /> */}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">type</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">number</FormLabel>
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
