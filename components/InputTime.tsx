import React, { use, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { UseFormRegister } from "react-hook-form";

type InputTimeProps = {
  register: UseFormRegister<any>;
  name: string;
};

const InputTime = ({ register, name }: InputTimeProps) => {
  return (
    <div className="flex flex-row items-center relative">
      <Input
        type="number"
        placeholder={
          name.slice(1, 2).toUpperCase() + name.slice(2, name.length)
        }
        {...register(name, { valueAsNumber: true })}
        className="pr-6 bg-secondary"
        autoComplete="off"
        onClick={(e) => e.currentTarget.select()}
      />
      <div className="absolute right-2">{name.slice(1, 2)}</div>
    </div>
  );
};

export default InputTime;
