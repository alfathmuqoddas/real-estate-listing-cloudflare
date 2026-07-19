import { User2, Heart, Building2, Plus, UserRoundKey } from "lucide-react";
import type { MenuItem } from "@/types";

export const userMenus: MenuItem[] = [
  {
    name: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
];

export const agentMenus: MenuItem[] = [
  {
    name: "Add Property",
    href: "/manage-properties/add",
    icon: Plus,
  },
  {
    name: "Manage Properties",
    href: "/manage-properties",
    icon: Building2,
  },
];

export const adminMenus: MenuItem[] = [
  {
    name: "Manage Users",
    href: "/manage-users",
    icon: User2,
  },
  {
    name: "Manage Agents",
    href: "/manage-agents",
    icon: UserRoundKey,
  },
];

export const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL;
