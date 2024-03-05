"use client";

import React, { createContext, use, useEffect, useState } from "react";
import LandingPage from "./LandingPage";
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
        <div className="">Step 3: Finsih a cycle to obtain Pokémon</div>
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

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;

    if (EVENTS.STEP_AFTER === type || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if (
      STATUS.FINISHED === status ||
      status === STATUS.SKIPPED ||
      action === ACTIONS.CLOSE
    ) {
      // Need to set our running state to false, so we can restart if we click start again.
      setStepIndex(0);
      setRun(false);
      return;
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
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
        }}
      />
      <LandingPage setRun={setRun} />
      <footer className="text-center text-gray-500 text-xs mt-5 mb-5">
        <p>© 2024 Pokemon Timer</p>
      </footer>
    </>
  );
};

export default Page;
