import { createUseQueries } from "@trpc/react-query/shared";
import { eq } from "drizzle-orm";
import type { get } from "http";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { entity1, entity2, contactSupport, users, insertContactSupportSchema, insertEntity1Schema, insertEntity2Schema } from "~/server/db/schema";

export const baseRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //     });
  //   }),

  getEntity1: publicProcedure.query(async ({ ctx ,input}) => {
    return  await ctx.db.select().from(entity1);
  }),
  // filterEntity1:publicProcedure.input(z.object({date:z.string()})).mutation(async ({ctx,input})=>{
  //   return await ctx.db.select().from(entity1).where(eq(entity1.startDate,input.date))
  // }),
  filterEntity2:publicProcedure.input(z.object({type:z.string()})).mutation(async ({ctx,input})=>{
    return await ctx.db.select().from(entity2).where(eq(entity2.type,input.type))
  }),
  getEntity2: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(entity2)
  }),
  addEntity1: publicProcedure.input(insertEntity1Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.insert(entity1).values(input)
  }),
  deleteEntity1: publicProcedure.input(z.number()).mutation(async ({ctx,input})=>{
    return await ctx.db.delete(entity1).where(eq(entity1.id,input))
  }
  ),
    createUseQueries: publicProcedure.query(async ({ctx})=>{
    return await ctx.db.select().from(users)
  }),
  updateUser:publicProcedure.input(z.object({id:z.number(),name:z.string()})).mutation(async ({ctx,input})=>{
    return await ctx.db.update(users).set({
      name:input.name
    }).where(eq(users.id, input.id!))
  }),
  getUser:publicProcedure.query(async ({ctx})=>{
    return await ctx.db.select().from(users)
  }),
  deleteUser:publicProcedure.input(z.number()).mutation(async ({ctx,input})=>{
    return await ctx.db.delete(users).where(eq(users.id,input))
  }),
  updateEntity1: publicProcedure.input(insertEntity1Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.update(entity1).set({
      name:input.name,
      birthyear:input.birthyear,
      surname:input.surname
    }).where(eq(entity1.id, input.id!))
  }
  ),
  addEntity2: publicProcedure.input(insertEntity2Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.insert(entity2).values(input)
    // .values(input)
  }),
  deleteEntity2:publicProcedure.input(z.number()).mutation(async ({ctx,input})=>{
    return await ctx.db.delete(entity2).where(eq(entity2.id,input))
  }),
  updateEntity2:publicProcedure.input(insertEntity2Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.update(entity2).set({
      name:input.name,
      type:input.type,
      number:input.number
    }).where(eq(entity2.id, input.id!))
  }),
  getSupportContact:publicProcedure.query(async ({ctx})=>{
    return await ctx.db.select().from(contactSupport)
  }),
  addSupportContact:publicProcedure.input(insertContactSupportSchema).mutation(async ({ctx,input})=>{
    return await ctx.db.insert(contactSupport).values(input)
  } ),
  deleteSupportContact:publicProcedure.input(z.number()).mutation(async ({ctx,input})=>{    
    return await ctx.db.delete(contactSupport).where(eq(contactSupport.id,input))
  } ),
  updateSupportContact:publicProcedure.input(insertContactSupportSchema).mutation(async ({ctx,input})=>{  
    return await ctx.db.update(contactSupport).set({
      name:input.name,
      email:input.email,
      phone:input.phone,
      department:input.department
    }).where(eq(contactSupport.id, input.id!))
  } )
});
