import type { User, Agency } from "@/types";
import { Button } from "./ui/button";
export const AgentSidebar = ({
  agent,
  agency,
}: {
  agent: Partial<User>;
  agency?: Partial<Agency>;
}) => {
  const { name, photoUrl } = agent;

  const { agencyName, logoUrl, establishedAt } = agency ?? {};

  return (
    <>
      <h1 className="mb-4 font-bold">Agent Info</h1>
      <div className="flex gap-4 items-center pb-4 border-b">
        {/* photo */}
        <figure className="size-16 rounded-full overflow-hidden">
          <img
            src={photoUrl}
            alt={`photoUrl ${name}`}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </figure>

        {/* name */}
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{name}</h1>
          <p className="text-sm text-muted-foreground">Corporate Agent</p>
        </div>
      </div>

      {agency && (
        <div className="flex gap-4 items-center py-4 border-b">
          {/* photo */}
          <figure className="size-16 rounded-full overflow-hidden">
            <img
              src={logoUrl}
              alt={`photoUrl ${agencyName}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
          {/* name */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold">{agencyName}</h1>
            <p className="text-sm text-muted-foreground">
              Since {establishedAt ?? "-"}
            </p>
          </div>
        </div>
      )}
      <div className="flex gap-2 items-center justify-between w-full pt-4">
        <Button size={"lg"} className={"flex-1"}>
          ✉️ Email
        </Button>
        <Button variant="outline" size={"lg"} className={"flex-1"}>
          📞 Call
        </Button>
      </div>
    </>
  );
};
