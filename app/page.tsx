"use client";

import InputTime from "@/components/InputTime";
import TimeFormField from "@/components/TImeFormField";
import TimerCount from "@/components/TimerCount";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { on } from "events";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import errorMap from "zod/locales/en.js";

export const formSchema = z.object({
  dhour: z.number().min(0).max(24),
  dminute: z.number().min(0).max(60),
  dsecond: z.number().min(0).max(60),
  rhour: z.number().min(0).max(24),
  rminute: z.number().min(0).max(60),
  rsecond: z.number().min(0).max(60),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dhour: 0,
      dminute: 0,
      dsecond: 0,
      rhour: 0,
      rminute: 0,
      rsecond: 0,
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const dtime = values.dhour * 3600 + values.dminute * 60 + values.dsecond;
    const rtime = values.rhour * 3600 + values.rminute * 60 + values.rsecond;
    setDtime(dtime);
    setRtime(rtime);
  };

  const [clicked, setClicked] = useState(0);
  const [dtime, setDtime] = useState(0);
  const [rtime, setRtime] = useState(0);

  return (
    <div className="w-[100vw] h-[100dvh] justify-center items-center flex">
      <div className="flex flex-col justify-center gap-10 w-full mx-auto items-center">
        <TimerCount key={clicked} timeD={dtime} timeR={rtime} click={clicked} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => onSubmit(d))}
            className="space-y-8"
          >
            <div>Work Time</div>
            <div className="flex flex-row sm:w-[40vw] w-[80vw]">
              {["dhour", "dminute", "dsecond"].map((name) => (
                <TimeFormField
                  key={name}
                  form={form}
                  register={register}
                  name={name}
                />
              ))}
            </div>
            <div>Rest time</div>
            <div className="flex flex-row sm:w-[40vw] w-[80vw]">
              {["rhour", "rminute", "rsecond"].map((name) => (
                <TimeFormField
                  key={name}
                  form={form}
                  register={register}
                  name={name}
                />
              ))}
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit" onClick={() => setClicked(clicked + 1)}>
                Start
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
