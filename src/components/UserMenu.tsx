import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import type { UserContext as User, MenuItem } from "@/types";
import { userMenus, agentMenus, adminMenus } from "@/constant";
import { LogOut } from "lucide-react";

const menuItemsByRole: Record<string, Array<MenuItem>> = {
  admin: [...adminMenus, ...agentMenus, ...userMenus],
  agent: [...agentMenus],
  user: [...userMenus],
};

const renderMenuByRole = (
  role: "admin" | "user" | "agent",
  menuItems: Record<string, Array<MenuItem>>,
) => {
  return (
    <>
      {menuItems[role].map((item, index) => (
        <DropdownMenuItem key={index}>
          <a
            href={item.href}
            className="flex items-center justify-between w-full"
          >
            <span>{item.name}</span>

            {item.icon && (
              <DropdownMenuShortcut>
                <item.icon size={16} />
              </DropdownMenuShortcut>
            )}
          </a>
        </DropdownMenuItem>
      ))}
    </>
  );
};

export const UserMenu = ({ user }: { user: User | null }) => {
  const { handleLogout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full overflow-hidden size-8">
          <img
            src={user?.photoUrl}
            alt="Profile"
            className="size-8 object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          {renderMenuByRole(user?.role ?? "user", menuItemsByRole)}
          <DropdownMenuItem>
            <a href="/profile">Profile</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Logout{" "}
          <DropdownMenuShortcut>
            <LogOut size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
