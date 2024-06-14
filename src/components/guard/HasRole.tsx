"use client";

import { useUser } from "@/providers/UserProvider";
import React, { ReactNode } from "react";
import UnauthorizedScreen from "../screens/UnauthorizedScreen";

interface Props {
  children: ReactNode | ReactNode[];
  permittedRole: string;
}

const HasRole = ({ children, permittedRole }: Props) => {
  const { role } = useUser();

  if (role === permittedRole) {
    return <div>{children}</div>;
  } else {
    return <UnauthorizedScreen />
  }
};

export default HasRole;
