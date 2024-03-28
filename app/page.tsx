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
import { getRandomInt } from "@/utils/func";
import { Button } from "@/components/ui/button";
import PokeIcon from "@/components/svgpic/icon";

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

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showMoving, setShowMoving] = useState(true);
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
      <div className={showMoving == true ? "" : "hidden"}>
        {[...pokelist].map((poke, index) => (
          <Movingbg
            key={poke}
            zIndex={getRandomInt(50, 100)}
            name={poke}
            idx={index}
          />
        ))}
      </div>
      <Image
        src={"/main-bg.jpg"}
        alt="bg"
        width={1920}
        height={1080}
        className="fixed top-0 left-0 -z-[100] opacity-20 blur-[2px] object-cover w-full h-full"
      />
      <LandingPage setRun={setRun} />
      <div className="flex flex-col w-full justify-between">
        <span>
          <div className="w-full grid place-items-center">
            <Button
              onClick={() => setShowMoving(!showMoving)}
              className="h-12 relative"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <PokeIcon isOpen={showMoving} />
                <span className="ml-9">Display Moving Pokemon</span>
              </div>
            </Button>
          </div>
          <footer className="text-center text-gray-500 text-xs mt-16">
            <p>© 2024 Pokemon Timer</p>
          </footer>
        </span>
      </div>
    </div>
  );
};

export default Page;
