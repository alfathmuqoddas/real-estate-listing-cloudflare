import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useEffect } from "react";

export const AuthCard = ({ type }: { type: string }) => {
  const { handleLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("reason") === "unauthorized") {
      toast.warning("You are not authorized, please login again.", {
        position: "top-center",
      });
    }
  }, []);

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{capitalizedType} to RealEstate App</CardTitle>
        <CardDescription>
          You can login with your Google account
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" onClick={handleLogin} className="w-full">
          {type === "login" ? "Login" : "Register"} with Google
        </Button>
      </CardFooter>
    </Card>
  );
};
