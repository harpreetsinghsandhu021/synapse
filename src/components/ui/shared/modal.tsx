"use client";

import { Label, TextInput } from "flowbite-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  header: string;
  type?: string;
  setUpdatedTitle?: Dispatch<SetStateAction<string>>;
  title?: string;
  description?: string;
}

export const ConfirmModal = ({
  children,
  onConfirm,
  disabled,
  type,
  title,
  setUpdatedTitle,
  header,
  description,
}: ConfirmModalProps) => {
  if (type === "form") {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="bg-white outline-none rounded-lg ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-lighter mb-4">
              {header}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <form>
                <div className="mb-2 block">
                  <Label
                    className="font-light"
                    htmlFor="email1"
                    value="Enter a new board name"
                  />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  onChange={(e) =>
                    setUpdatedTitle && setUpdatedTitle(e.target.value)
                  }
                  defaultValue={title}
                  required
                />
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-black hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border border-transparent hover:border-black"
              disabled={disabled}
              onClick={onConfirm}
              type="submit"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-lighter mb-4">
            {header}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-black hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border border-transparent hover:border-black"
            disabled={disabled}
            onClick={onConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
