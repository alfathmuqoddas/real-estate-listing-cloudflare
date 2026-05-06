import type { UserContext as User } from "@/types";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";

export const AuthButton = ({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: User | null;
}) => {
  return (
    <div className={"flex gap-2 items-center"}>
      {isLoggedIn ? (
        <UserMenu user={user} />
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Login
          </Button>
          <Button onClick={() => (window.location.href = "/auth/register")}>
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};
