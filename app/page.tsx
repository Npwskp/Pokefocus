"use client";

import TimeFormField from "@/components/TimeFormField";
import TimerCount from "@/components/TimerCount";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getScreenSize } from "@/utils/getScreenSize";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const e = {
  invalid_type_error: "Invalid Number",
  required_error: "Number is required",
};

function en(num: number) {
  return {
    message: `Enter num > ${num}`,
  };
}

export const formSchema = z.object({
  dhour: z.number(e).min(0, en(0)),
  dminute: z.number(e).min(0, en(0)).max(60),
  dsecond: z.number(e).min(1, en(1)).max(60),
  rhour: z.number(e).min(0, en(0)),
  rminute: z.number(e).min(0, en(0)).max(60),
  rsecond: z.number(e).min(1, en(1)).max(60),
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
    setStatus("start");
  };

  const [dtime, setDtime] = useState(0);
  const [rtime, setRtime] = useState(0);
  const [status, setStatus] = useState("");
  const screen = getScreenSize();

  return (
    <div className="w-[100vw] h-[100dvh] justify-center items-center flex">
      <div className="flex flex-col justify-center gap-10 mx-auto items-center sm:w-full w-[80%]">
        <TimerCount
          key={status}
          timeD={dtime}
          timeR={rtime}
          status={status}
          setStatus={setStatus}
          smul={screen.width > 640 ? 1.2 : 0.7}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-8", {
              hidden: status === "start" || status === "rest",
            })}
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              <div>Work Time</div>
              <div className="flex flex-row w-full">
                {["dhour", "dminute", "dsecond"].map((name) => (
                  <TimeFormField
                    key={name}
                    form={form}
                    register={register}
                    name={name}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div>Rest time</div>
              <div className="flex flex-row w-full">
                {["rhour", "rminute", "rsecond"].map((name) => (
                  <TimeFormField
                    key={name}
                    form={form}
                    register={register}
                    name={name}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full justify-end">
              <Button type="submit">Start</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
