"use client";

import {
  DropdownMenuContentProps,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/shared/modal";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface ActionsProp {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProp) => {
  const { mutate: remove, isLoading } = useApiMutation(api.board.remove);
  const { mutate: update, isLoading: isLoading2 } = useApiMutation(
    api.board.update
  );

  const [updatedTitle, setUpdatedTitle] = useState<string>(title);

  const handleDelete = () => {
    remove({ orgId: id as Id<"boards"> })
      .then(() => toast.success("Board deleted!"))
      .catch(() => toast.error("Failed to delete board"));
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/boards/${id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };
  const handleUpdate = () => {
    update({ orgId: id as Id<"boards">, title: updatedTitle })
      .then(() => toast.success("Board renamed!"))
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className="dropdown--actions p-3 bg-white w-60 text-sm border-none rounded-lg"
        >
          <DropdownMenuItem
            className="p-3 hover:bg-[#E8ECFC] rounded-lg hover:text-[#314CD9] flex items-center cursor-pointer outline-none"
            onClick={handleCopyLink}
          >
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem>

          <ConfirmModal
            header="Rename Board"
            disabled={isLoading2}
            type="form"
            title={title}
            setUpdatedTitle={setUpdatedTitle}
            onConfirm={handleUpdate}
          >
            <button
              className="p-3 w-full hover:bg-[#E8ECFC] rounded-lg hover:text-[#314CD9] flex items-center cursor-pointer outline-none"
              onClick={() => {}}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Rename
            </button>
          </ConfirmModal>
          <ConfirmModal
            header="Delete board?"
            description="This will delete the board and all of its content"
            disabled={isLoading}
            onConfirm={handleDelete}
          >
            <button className="p-3 w-full hover:bg-[#E8ECFC] rounded-lg hover:text-[#314CD9] flex items-center cursor-pointer outline-none">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
