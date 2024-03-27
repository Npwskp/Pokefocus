"use client";

import { getRandomInt } from "@/utils/func";
import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { set } from "react-hook-form";
type MovingbgProps = {
  zIndex: number;
  name: string;
  idx: number;
};

const Movingbg: React.FC<MovingbgProps> = ({ zIndex, name, idx }) => {
  const [Xposition, setXposition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [facing, setFacing] = useState(1);
  const img = useGetPokemonPic({ name, pictype: "Gif" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    setXposition(getRandomInt(0, 90));
    setSpeed(getRandomInt(1, 4));
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    if (Xposition === 90) {
      setFacing(-1);
    } else if (Xposition === 0) {
      setFacing(1);
    }

    const time = setTimeout(() => {
      setXposition(Xposition + facing * 0.5 * speed);
    }, 500);
    return () => clearTimeout(time);
  }, [Xposition, facing, speed]);

  if (!isLoaded) return null;

  return (
    <Image
      src={img?.toString() || "/pokeball.png"}
      alt="moveing-poke"
      width={80}
      height={80}
      className={`fixed bottom-0 -z-[60]`}
      style={{
        right: `${Xposition}%`,
        transform: `rotateY(${facing == 1 ? 0 : 180}deg)`,
      }}
      key={idx}
    />
  );
};

export default Movingbg;
