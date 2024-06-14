import NextTopLoader from "nextjs-toploader";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export const TopLoaderProvider = ({ children }: Props) => {
  return (
    <>
      <NextTopLoader color="#2563eb" showSpinner={false} />
      {children}
    </>
  );
};
