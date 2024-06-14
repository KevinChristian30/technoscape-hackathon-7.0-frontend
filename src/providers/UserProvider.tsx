"use client";

import LoadingScreen from "@/components/screens/LoadingScreen";
import UnathenticatedScreen from "@/components/screens/UnauthenticatedScreen";
import { useMe } from "@/composables/auth/query/useMe";
import { createContext, useContext, useMemo } from "react";

type UserContextData = {
  email: string;
  id: string;
  name: string;
  role: string;
};

const CurrentUserContext = createContext<UserContextData>({
  email: "",
  id: "",
  name: "",
  role: ""
});

export function useUser() {
  return useContext(CurrentUserContext);
}

const UserProvider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data, status } = useMe();

  const user = useMemo<UserContextData>(() => {
    return {
      email: data ? data.data.email : "",
      id: data ? data.data.id : "",
      name: data ? data.data.name : "",
      role: data ? data.data.role : ""
    };
  }, [data]);

  if (status === "pending") {
    return <LoadingScreen />;
  } else if (status === "error" || !data) {
    return <UnathenticatedScreen />;
  } else {
    return (
      <CurrentUserContext.Provider value={user}>
        {children}
      </CurrentUserContext.Provider>
    );
  }
};

export default UserProvider;
