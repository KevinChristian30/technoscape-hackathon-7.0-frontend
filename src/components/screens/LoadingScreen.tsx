import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <LoaderCircle className="animate-spin h-12 w-12" />
        <h1 className="text-2xl">Securing your connection</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
