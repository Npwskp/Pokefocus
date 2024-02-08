import { stat } from "fs";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { set } from "react-hook-form";
import { number } from "zod";

type TimerCountProps = {
  timeD: number;
  timeR: number;
  status: string;
  smul: number;
  isPaused: boolean;
  setStatus: (status: string) => void;
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
  smul,
  isPaused,
}: TimerCountProps) => {
  const [path, setPath] = useState("/066.png");
  const [time, setTime] = useState(0);

  function renderTime(status: string) {
    if (status === "" || status === "timesup") {
      return (
        <div className="flex flex-col gap-3">
          <CountdownCircleTimer
            isPlaying={status === "timesup"}
            duration={3}
            colors={
              status === "timesup"
                ? ["#A30000", "#A30000"]
                : ["#004777", "#004777"]
            }
            onComplete={() => {
              setStatus("");
            }}
            colorsTime={[3, 0]}
            size={250}
            strokeWidth={30}
            trailColor="#A30000"
          >
            {({ remainingTime }) => {
              return (
                <div className="">
                  {status == "timesup" ? "Time's Up !" : "Insert Time !"}
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
              setStatus(status === "start" ? "rest" : "timesup");
            }}
            size={500 * smul}
            strokeWidth={30}
            onUpdate={(elapsedTime) => {
              console.log(elapsedTime);
              if (status === "start") {
                if (elapsedTime === Math.ceil(_time * 0.6) + 1) {
                  setPath("/067.png");
                } else if (elapsedTime === Math.floor(_time * 0.3) + 1) {
                  setPath("/068.png");
                }
              } else if (status === "rest") {
                setPath("/143.png");
              } else {
                setPath("/066.png");
              }
            }}
          >
            {({ remainingTime }) => {
              const hour = Math.floor(remainingTime / 3600);
              const minute = Math.floor((remainingTime % 3600) / 60);
              const second = remainingTime % 60;
              return (
                <div>
                  <div className="flex flex-col justify-center items-center sm:text-6xl text-4xl sm:gap-2 gap-1">
                    <Image
                      src={path}
                      width={200 * smul}
                      height={200 * smul}
                      alt="pokemon"
                    />
                    {formatTime(`${hour}:${minute}:${second}`)}
                    <div className="sm:text-3xl text-xl">
                      {status == "start" ? "Focus" : "Rest"} Time
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
