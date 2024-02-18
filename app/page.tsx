"use client";

import TimeFormField from "@/components/TimeFormField";
import TimerCount from "@/components/TimerCount";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getScreenSize } from "@/utils/getScreenSize";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/utils/timeFormSchema";
import { get } from "http";
import ChoosePoke from "@/components/ChoosePoke";

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
    if (dtime === 0 || rtime === 0) return;
    setDtime(dtime);
    setRtime(rtime);
    setStatus("start");
  };

  const [dtime, setDtime] = useState(0);
  const [rtime, setRtime] = useState(0);
  const [status, setStatus] = useState("");
  const [pause, setPause] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const screen = getScreenSize();

  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col">
      <div className="justify-center items-center flex flex-col h-full">
        <div className="flex flow-row justify-between md:w-[50%] w-[90%] sm:p-5 p-3">
          <div className="flex flex-row gap-2">
            <div className="items-center flex text-2xl">PokeFocus</div>
            <Image
              src="/025.png"
              width={50}
              height={50}
              alt="pika"
              className="object-contain"
            />
          </div>
          <ModeToggle />
        </div>
        <div className="dark:bg-white bg-black md:w-[50%] w-[90%] h-[2px]"></div>
        <div className="flex flex-col justify-center gap-10 mx-auto items-center sm:w-full w-[80%] h-full">
          <ChoosePoke name={pokemon} setName={setPokemon} />
          <TimerCount
            key={status}
            timeD={dtime}
            timeR={rtime}
            status={status}
            setStatus={setStatus}
            smul={screen.width > 640 ? 1.2 : 0.7}
            isPaused={pause}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-8", {
                hidden:
                  status === "start" || status === "rest" || status === "pause",
              })}
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <div>Focus Time</div>
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

              <div className="flex w-full justify-center">
                <Button type="submit" className="text-2xl" size={"lg"}>
                  START
                </Button>
              </div>
            </form>
          </Form>
          <div
            className={cn(
              "flex flow-row sm:justify-evenly justify-between items-center w-full",
              {
                hidden: status === "timesup" || status === "",
              }
            )}
          >
            <Button
              variant={"circle"}
              className="font-semibold h-20"
              onClick={() => setPause((prev) => !prev)}
            >
              {pause ? "Resume" : "Pause"}
            </Button>
            <Button
              variant={"circle"}
              className="font-semibold h-20"
              onClick={() => {
                setStatus("");
                setPause(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
