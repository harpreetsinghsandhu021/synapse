"use client";
import { Button, Sidebar } from "flowbite-react";

import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  CreateOrganization,
  OrganizationList,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import OrganizationListBar from "./list";
import { Hint } from "@/components/ui/shared/tooltip";
import { Poppins } from "next/font/google";
import { MdOutlineDashboard, MdOutlineStar } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const DashboardSidebar = () => {
  return (
    <aside className="flex min-h-full ">
      <Sidebar
        className="left-sidebar min-w-16"
        collapsed
        aria-label="Sidebar with multi-level dropdown example"
      >
        {/* <Sidebar.Logo
          href="#"
          className="-ml-2"
          img="/logo.svg"
          imgAlt="Flowbite logo"
        >
          Synapse
        </Sidebar.Logo> */}
        <OrganizationListBar />
        <Dialog>
          <DialogTrigger className="cursor-pointer">
            <Hint side="right" sideOffset={20} label="Create Organization">
              <Button
                className={`hover:bg-gray-200 bg-gray-300  w-10 flex justify-center items-center rounded-full h-10 group`}
                color={"none"}
              >
                <FaPlus className="fill-gray-800 h-4 w-4" />
              </Button>
            </Hint>
          </DialogTrigger>
          <DialogContent className="bg-transparent p-0  border-none" title="">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </Sidebar>
      <InnerSidebar />
    </aside>
  );
};

function InnerSidebar() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <Sidebar
      className={`${poppins.className} hidden lg:block h-full`}
      aria-label="Sidebar with multi-level dropdown example"
    >
      <Sidebar.Logo
        href="#"
        className="-ml-2"
        img="/logo.svg"
        imgAlt="Flowbite logo"
      >
        Synapse
      </Sidebar.Logo>

      <div className="max-w-full text-4xl flex border rounded-xl organization-switcher ">
        <OrganizationSwitcher hidePersonal />
      </div>
      <Sidebar.Items className="my-4">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            active={!favorites && pathName === "/" ? true : false}
            href="/"
            icon={MdOutlineDashboard}
            labelColor="dark"
            className={`${!favorites && pathName === "/" ? "border-[#050037] border-l-8" : " "} text-sm `}
          >
            Team Boards
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            active={favorites}
            href="?favorites=true"
            icon={MdOutlineStar}
            className={`${favorites ? "border-[#050037] border-l-8" : ""} text-sm`}
            labelColor="dark"
          >
            Favorite Boards
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
