"use client";

import { useForm } from "react-hook-form";
import {type  z } from "zod";
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
import { insertEntity1Schema } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";

export default function AddEntity1Dialog() {
  const [open, setOpen] = useState(false);

  const { refetch } = api.base.getEntity1.useQuery();

  const { mutate} = api.base.addEntity1.useMutation({
    onSuccess: async () => {
      setOpen(false);
      await refetch();
    },
  });

  const form = useForm<z.infer<typeof insertEntity1Schema>>({
    resolver: zodResolver(insertEntity1Schema),
    defaultValues: {
      name: "",
      birthyear: new Date(Date.now()).toString(),
      surname: "",
    },
  });

  function onSubmit(values: z.infer<typeof insertEntity1Schema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button>Create Author</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create</DialogTitle>
            <DialogDescription>Fill the data to create</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 space-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">name</FormLabel>
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
              name="surname"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="text-sm font-normal">surname</FormLabel>
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
              name="birthyear"
              render={({ field: _field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>

                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-center font-normal",
                        !form.getValues("birthyear") && "text-muted-foreground",
                      )}
                      disabled
                    >
                      {form.watch("birthyear") ? (
                        format(form.watch("birthyear")!, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>

                  <Calendar
                    mode="single"
                    selected={
                      form.getValues("birthyear")
                        ? new Date(form.watch("birthyear")!)
                        : undefined
                    }
                    onSelect={(date) => {
                      console.log(date?.toString());
                      form.setValue("birthyear", date?.toString());
                    }}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                  />

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
