"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";

import { Button } from "flowbite-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/boardList";
import { useSearchParams } from "next/navigation";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function Home({}: DashboardPageProps) {
  const urlParams = useSearchParams();
  const searchParams = {
    search: urlParams.get("search") || "",
    favorites: urlParams.get("favorites") || "",
  };

  const { organization } = useOrganization();

  return (
    <main className="flex h-screen p-4 flex-col items-center justify-between ">
      {organization ? (
        <BoardList orgId={organization.id} query={searchParams as object} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <Image src="/elements.svg" alt="Empty" height={250} width={250} />
          <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Create an organization to get started
          </p>
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="rounded-xl px-4 bg-black  text-white"
                  color={"black"}
                  size="lg"
                >
                  Create organization
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization routing="hash" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </main>
  );
}
