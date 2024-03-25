"use client";

import React, { createContext, use, useEffect, useState } from "react";
import LandingPage, { usePokeListStore } from "./LandingPage";
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  ORIGIN,
  Placement,
  STATUS,
} from "react-joyride";
import Image from "next/image";
import { set } from "react-hook-form";
import Movingbg from "@/components/Movingbg";

const steps = [
  {
    target: "#step1",
    content: (
      <div className="flex flex-col gap-2">
        <div className="">Step 1: Choose Pokemon To Collect</div>
        <Image
          src={"/step1.gif"}
          alt="step1"
          width={400}
          height={300}
          className="dark:block hidden"
        />
        <Image
          src={"/step1-w.gif"}
          alt="step1"
          width={400}
          height={300}
          className="dark:hidden block"
        />
      </div>
    ),
  },
  {
    target: "#step2",
    content: (
      <div className="flex flex-col gap-2">
        <div className="">Step 2: Set Work & Rest Time then start</div>
        <Image
          src={"/step2.gif"}
          alt="step2"
          width={400}
          height={300}
          className="dark:block hidden"
        />
        <Image
          src={"/step2-w.gif"}
          alt="step2"
          width={400}
          height={300}
          className="dark:hidden block"
        />
      </div>
    ),
  },
  {
    target: "#step3",
    content: (
      <div className="flex flex-col gap-2">
        <div className="">Step 3: Finish a cycle to obtain Pokémon</div>
        <Image
          src={"/step3.gif"}
          alt="step3"
          width={400}
          height={300}
          className="dark:block hidden"
        />
        <Image
          src={"/step3-w.gif"}
          alt="step3"
          width={400}
          height={300}
          className="dark:hidden block"
        />
      </div>
    ),
  },
];

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const pokelist = usePokeListStore((state) => state.pokeList);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;

    if (EVENTS.STEP_AFTER === type) {
      // Update state to advance the tour
      setStepIndex(stepIndex + (action === ACTIONS.PREV ? -1 : 1));
      if (stepIndex === -1) {
        setStepIndex(0);
      }
    } else if (
      STATUS.FINISHED === status ||
      status === STATUS.SKIPPED ||
      action === ACTIONS.CLOSE ||
      origin === ORIGIN.BUTTON_CLOSE ||
      origin === ORIGIN.OVERLAY
    ) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRun(false);
      setStepIndex(0);
      console.log("Joyride finished", stepIndex);
    }
    console.log(stepIndex);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="relative w-full h-full">
      <Joyride
        steps={steps}
        stepIndex={stepIndex}
        run={run}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#1f75ae",
          },
          buttonClose: {
            display: "none",
          },
        }}
      />
      {pokelist.map((poke, index) => (
        <Movingbg
          key={poke + index}
          zIndex={getRandomInt(1, 100)}
          name={poke}
          idx={index}
        />
      ))}
      <LandingPage setRun={setRun} />
      <Image
        src={"/main-bg.jpg"}
        alt="bg"
        width={1920}
        height={1080}
        className="fixed top-0 left-0 -z-50 opacity-20 blur-[2px] object-cover w-full h-full"
      />
      <footer className="text-center text-gray-500 text-xs mt-5 mb-5">
        <p>© 2024 Pokemon Timer</p>
      </footer>
    </div>
  );
};

export default Page;
