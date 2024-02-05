import React, { use, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type TimerCountProps = {
  timeD: number;
  timeR: number;
  click: number;
};

function formatTime(time: string): string {
  const parts = time.split(":");
  const formattedParts = parts.map((part) =>
    part.length === 1 ? `0${part}` : part
  );
  return formattedParts.join(":");
}

const TimerCount = ({ timeD, timeR, click }: TimerCountProps) => {
  const [time, setTime] = useState(timeD);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
        console.log(time);
      }, 1000);
    }
  }, [time]);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={true}
        duration={timeD}
        colors={["#004777", "#F7B801", "#A30000"]}
        colorsTime={[timeD, timeD / 2, 0]}
        onComplete={() => ({ delay: 3 })}
        size={250}
      >
        {({ remainingTime }) => {
          if (click === 0) {
            return <div className="">Insert Time !</div>;
          }
          if (remainingTime === 0) {
            return <div className="">{"Time's up"}</div>;
          }
          const hour = Math.floor(remainingTime / 3600);
          const minute = Math.floor((remainingTime % 3600) / 60);
          const second = remainingTime % 60;
          return (
            <div>
              <div className="">
                {formatTime(`${hour}:${minute}:${second}`)}
              </div>
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default TimerCount;
