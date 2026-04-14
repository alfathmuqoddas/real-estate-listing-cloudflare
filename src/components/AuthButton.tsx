import { Button } from "./ui/button";

export const AuthButton = () => {
  return (
    <div className={"flex gap-2 items-center"}>
      <Button variant="outline">Login</Button>
      <Button>Sign up</Button>
    </div>
  );
};
