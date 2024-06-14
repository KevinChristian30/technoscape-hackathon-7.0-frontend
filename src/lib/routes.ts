import {
  BarChart2,
  BotMessageSquare,
  Headset,
  LayoutDashboard,
  LucideIcon,
  Mail,
  MessageCircle,
  NotebookText,
  UsersRound,
} from "lucide-react";

export interface Route {
  name: string;
  icon: LucideIcon;
  url: string;
}

export const adminRoutes: Route[] = [
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

export const agentRoutes: Route[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Ask AI",
    icon: BotMessageSquare,
    url: "/ai-chat",
  },
  {
    name: "Chats",
    icon: MessageCircle,
    url: "/customer-chats",
  },
  {
    name: "Calls",
    icon: Headset,
    url: "/customer-calls",
  },
  {
    name: "Emails",
    icon: Mail,
    url: "/customer-emails",
  },
  {
    name: "My Report",
    icon: NotebookText,
    url: "/my-report",
  },
];

export enum Role {
  ADMIN = "Admin",
  AGENT = "Agent",
}

export const routeMap: Map<string, Route[]> = new Map();
routeMap.set(Role.ADMIN.toString(), adminRoutes);
routeMap.set(Role.AGENT.toString(), agentRoutes);
