import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Control } from "react-hook-form";
import { Input } from "../ui/Input";

interface Props {
  control?: Control<any>;
  name?: string;
  label?: string;
  placeHolder?: string;
  type?: HTMLInputTypeAttribute;
}

const MHDTextField = ({ control, name, label, placeHolder, type }: Props) => {
  return (
    <FormField
      control={control}
      name={name ?? ""}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeHolder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MHDTextField;
