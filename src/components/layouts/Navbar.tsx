import React from "react";
import SidePanelMobile from "./SidePanelMobile";
import ProfileButton from "../ui/ProfileButton";
import ThemeToggleButton from "../ui/ThemeToggleButton";

const Navbar = () => {
  return (
    <>
      <SidePanelMobile />
      <div className="flex gap-2">
        <ThemeToggleButton />
        <ProfileButton />
      </div>
    </>
  );
};

export default Navbar;
