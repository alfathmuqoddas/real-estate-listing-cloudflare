import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export const AuthButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { handleLogout } = useAuth();
  return (
    <div className={"flex gap-2 items-center"}>
      {isLoggedIn ? (
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
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
