import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import InputTime from "./InputTime";
import { Field, UseFormRegister, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/app/page";

type TimeFormFieldProps = {
  form: UseFormReturn<any>;
  register: UseFormRegister<any>;
  name: string;
};

const TimeFormField = ({ form, register, name }: TimeFormFieldProps) => {
  type Field = keyof (typeof formSchema)["_input"];
  const _name = name as Field;
  return (
    <FormField
      control={form.control}
      name={_name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputTime register={register} name={name} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimeFormField;
