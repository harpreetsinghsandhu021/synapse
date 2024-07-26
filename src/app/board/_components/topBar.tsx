"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useDebounceCallback } from "usehooks-ts";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { Editor } from "tldraw";

const TopBar = ({
  boardId,
  children,
  isDarkMode,
}: {
  boardId: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}) => {
  const board = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  const { mutate: update, isLoading: isLoading2 } = useApiMutation(
    api.board.update
  );

  const handleTitleChange = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      update({
        orgId: boardId as Id<"boards">,
        title: e.target.value,
      })
        .then(() => toast.success("Board renamed!"))
        .catch(() => toast.error("Failed to rename board"));
    },
    1000
  );

  return (
    <div
      className={`border z-50 mt-2 ml-2  ${isDarkMode ? "bg-[#242428] border-gray-800 text-white" : "bg-white"} pointer-events-auto rounded-xl w-[35rem] `}
    >
      <div className="py-1 px-4">
        <div className="flex items-center justify-between ">
          <Link className="flex items-center justify-center gap-2" href={"/"}>
            <Image
              className="inline-block"
              src={"/logo.svg"}
              width={40}
              height={40}
              alt="logo"
            />{" "}
            <span className="font-[500] text-xl">Synapse</span>
          </Link>
          <span className=" inline-block scale-y-150 text-gray-300 ">|</span>
          <input
            className="bg-transparent max-w-28 text-base capitalize text-center w-fit outline-none"
            defaultValue={board?.title}
            onChange={handleTitleChange}
          />
          <span className="inline-block scale-y-150 text-gray-300 ">|</span>
          {/* <button className="bg-none p-2 hover:bg-[#E8ECFC] rounded-lg hover:text-[#314CD9]">
            <GiHamburgerMenu className="h-6 w-6" />
          </button> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
}
export default TopBar;
