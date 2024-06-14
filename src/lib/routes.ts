import {
  BarChart2,
  LayoutDashboard,
  LucideIcon,
  UsersRound,
} from "lucide-react";

export interface Route {
  name: string;
  icon: LucideIcon;
  url: string;
}

export const routes: Route[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Agents",
    icon: UsersRound,
    url: "/agents",
  },
  {
    name: "Analytics",
    icon: BarChart2,
    url: "/analytics",
  },
];
