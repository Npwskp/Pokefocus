"use client";

import { Status } from "@/app/LandingPage";
import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import usePokeCollect from "@/hook/usePokeCollect";
import { useScreenSize } from "@/hook/useScreenSize";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type TimerCountProps = {
  timeD: number;
  timeR: number;
  status: string;
  isPaused: boolean;
  setStatus: (status: Status) => void;
  name: string;
};

function formatTime(time: string): string {
  const parts = time.split(":");
  const formattedParts = parts.map((part) =>
    part.length === 1 ? `0${part}` : part
  );
  return formattedParts.join(":");
}

const TimerCount = ({
  timeD,
  timeR,
  status,
  setStatus,
  isPaused,
  name,
}: TimerCountProps) => {
  const img = useGetPokemonPic({ name: name, pictype: "Picture" });
  const screen = useScreenSize();
  const { collectPokemon, ...trash } = usePokeCollect(name);

  function renderTime(status: string) {
    if (status === "" || status === "timesup") {
      return (
        <div className="flex flex-col gap-3">
          <CountdownCircleTimer
            isPlaying={status === "timesup"}
            duration={5}
            colors={
              status === "timesup"
                ? ["#A30000", "#A30000"]
                : ["#004777", "#004777"]
            }
            onComplete={() => {
              setStatus("");
            }}
            colorsTime={[5, 0]}
            size={screen.width > 600 ? 300 : 200}
            strokeWidth={30}
            trailColor="#A30000"
          >
            {({ remainingTime }) => {
              return (
                <div className="font-bold">
                  {status === "timesup" ? "Time's Up !" : "Insert Time !"}
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>
      );
    } else {
      const _time = status === "start" ? timeD : timeR;
      return (
        <div className="flex flex-col gap-10">
          <CountdownCircleTimer
            key={status}
            isPlaying={!isPaused}
            duration={_time}
            colors={["#004777", "#F7B801", "#A30000"]}
            colorsTime={[_time, _time / 3, 0]}
            onComplete={() => {
              if (status === "rest") {
                collectPokemon();
              }
              setStatus(status === "start" ? "rest" : "timesup");
            }}
            size={screen.width > 600 ? 500 * 1.2 : 500 * 0.7}
            strokeWidth={30}
          >
            {({ remainingTime }) => {
              const hour = Math.floor(remainingTime / 3600);
              const minute = Math.floor((remainingTime % 3600) / 60);
              const second = remainingTime % 60;
              return (
                <div>
                  <div className="flex flex-col justify-center items-center sm:text-6xl text-4xl sm:gap-2 gap-1">
                    <Image
                      src={img?.toString() || ""}
                      width={screen.width > 600 ? 250 : 150}
                      height={screen.width > 600 ? 250 : 150}
                      alt="pokemon"
                    />
                    {formatTime(`${hour}:${minute}:${second}`)}
                    <div className="sm:text-3xl text-xl">
                      {status === "start" ? "Focus" : "Rest"} Time
                    </div>
                  </div>
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {renderTime(status)}
    </div>
  );
};

export default TimerCount;
