import { Loader } from "lucide-react";
import { InfoSkeleton } from "./topBar";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolBar";

export const Loading = () => {
  return (
    <main
      className="h-[100vh] w-full relative bg-neutral-100 touch-none
    flex items-center justify-center"
    >
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
