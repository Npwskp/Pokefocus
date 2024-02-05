import React from "react";
import { Input } from "./ui/input";
import { UseFormRegister } from "react-hook-form";

type InputTimeProps = {
  register: UseFormRegister<any>;
  placeholder: string;
  name: string;
  after?: string;
};

const InputTime = ({ register, placeholder, name, after }: InputTimeProps) => {
  return (
    <div className="flex flex-row items-center relative">
      <Input
        type="number"
        placeholder={placeholder}
        {...register(name, { valueAsNumber: true })}
        className="pr-6"
      />
      <div className="absolute right-2">{after}</div>
    </div>
  );
};

export default InputTime;
