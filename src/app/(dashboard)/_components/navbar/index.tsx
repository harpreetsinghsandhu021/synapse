import { UserButton } from "@clerk/nextjs";
import React from "react";
import { SearchInput } from "./searchBar";
import { Button } from "flowbite-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="py-2 px-4">
      <div className="flex justify-between">
        <SearchInput />
        <div className="flex-1 flex items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="whitespace-nowrap hover:bg-gray-200 border items-center mr-4 rounded-xl"
                pill
                color={"none"}
              >
                <Plus className="h-4 w-4 mr-2" />
                Invite members
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
              <OrganizationProfile routing="hash" />
            </DialogContent>
          </Dialog>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
