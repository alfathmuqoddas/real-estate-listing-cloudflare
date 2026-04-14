import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export const AuthButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { handleLogin, handleLogout } = useAuth();
  return (
    <div className={"flex gap-2 items-center"}>
      {isLoggedIn ? (
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={handleLogin}>
            Login
          </Button>
          <Button>Sign up</Button>
        </>
      )}
    </div>
  );
};
