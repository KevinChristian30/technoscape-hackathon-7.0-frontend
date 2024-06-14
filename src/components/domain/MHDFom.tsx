import React, { ReactNode } from "react";
import { Form } from "../ui/Form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
  onFormSubmit: SubmitHandler<any>;
  children?: ReactNode | ReactNode[];
  className?: string;
}

const MHDForm = ({ form, onFormSubmit, children, className }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className={className}
        method="post"
      >
        {children}
      </form>
    </Form>
  );
};

export default MHDForm;
