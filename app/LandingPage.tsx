"use client";

import TimeFormField from "@/components/TimeFormField";
import TimerCount from "@/components/TimerCount";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/utils/timeFormSchema";
import ChoosePoke from "@/components/ChoosePoke";
import PokeCollect from "@/components/PokeCollect";
import { create } from "zustand";
import { AlertDestructive } from "@/components/AlertDestrutive";
import CollectedPokeModal from "@/components/CollectedPokeModal";
import Information from "@/components/Information";
import Joyride from "react-joyride";

export type Status = "start" | "rest" | "timesup" | "";

export interface PokeListStore {
  pokeList: string[];
  setPokeList: (pokeList: string[]) => void;
}

export const usePokeListStore = create<PokeListStore>()((set) => ({
  pokeList: [],
  setPokeList: (pokeList: string[]) =>
    set((state) => ({
      ...state,
      pokeList,
    })),
}));

type LandingPageProps = {
  setRun: (run: boolean) => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ setRun }) => {
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
    if (dtime === 0 || rtime === 0) {
      setIsAlert("Please fill in all the form");
      return;
    }
    if (pokemon === "") {
      setIsAlert("Please choose a pokemon");
      return;
    }
    setDtime(dtime);
    setRtime(rtime);
    setIsAlert("");
    setStatus("start");
  };

  const [dtime, setDtime] = useState(0);
  const [rtime, setRtime] = useState(0);
  const [status, setStatus] = useState<Status>("");
  const [pause, setPause] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const pokemonList = usePokeListStore((state) => state.pokeList);
  const [isAlert, setIsAlert] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (status === "timesup") {
      setIsOpen(true);
    }
    if (isAlert !== "") {
      const timer = setTimeout(() => {
        setIsAlert("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pokemonList, isAlert, status]);

  if (!isLoaded) return null;

  return (
    <span className="-z-50">
      {isAlert && <AlertDestructive message={isAlert} setAlert={setIsAlert} />}
      <div className="w-full h-full flex flex-col justify-around items-center overflow-auto">
        <div className="flex flow-row justify-between sm:w-[80%] w-[90%] sm:p-5 p-3">
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
          <div className="flex flex-row gap-2 h-full items-center">
            <Information setRun={setRun} />
            <ModeToggle />
          </div>
        </div>
        <div className="dark:bg-white bg-black sm:w-[80%] w-[90%] h-[2px]"></div>
        <div
          className={cn("md:mt-6 mt-4", {
            hidden: status === "start" || status === "rest",
          })}
          id="step1"
        >
          <ChoosePoke name={pokemon} setName={setPokemon} />
        </div>
        <div className="flex flex-col justify-around mx-auto items-center sm:w-full w-[80%] h-full gap-5 my-10">
          <CollectedPokeModal
            open={isOpen}
            onClose={setIsOpen}
            pokemon={pokemon}
          />
          <TimerCount
            key={status}
            timeD={dtime}
            timeR={rtime}
            status={status}
            setStatus={setStatus}
            isPaused={pause}
            name={pokemon}
          />
          <span id="step2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-8", {
                  hidden: status === "start" || status === "rest",
                })}
              >
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div>Focus Time</div>
                  <div className="flex flex-row w-full gap-2">
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
                  <div className="flex flex-row w-full gap-2">
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
                  <Button
                    type="submit"
                    className="text-2xl bg-primary"
                    size={"lg"}
                  >
                    START
                  </Button>
                </div>
              </form>
            </Form>
          </span>
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
      <PokeCollect stage={status} />
    </span>
  );
};

export default LandingPage;
