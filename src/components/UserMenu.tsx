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
import type { UserContext as User } from "@/types";
import { LogOut } from "lucide-react";

const renderMenuByRole = (role: "admin" | "user" | "agent") => {
  const submenus = {
    admin: [{ name: "Dashboard", href: "/dashboard" }],
    user: [{ name: "Dashboard", href: "/dashboard" }],
    agent: [{ name: "Dashboard", href: "/dashboard" }],
  };

  return (
    <>
      {submenus[role].map((item, index) => (
        <DropdownMenuItem key={index}>
          <a href={item.href}>{item.name}</a>
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
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {renderMenuByRole(user?.role ?? "user")}
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
