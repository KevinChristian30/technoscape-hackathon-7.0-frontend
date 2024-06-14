import React, { ReactNode } from "react";
import { Button } from "../ui/Button";

interface Props {
  title: string;
  children?: ReactNode | ReactNode[];
}

const PageLayout = ({ title, children }: Props) => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="flex flex-col items-start justify-center">{children}</div>
    </>
  );
};

export default PageLayout;
