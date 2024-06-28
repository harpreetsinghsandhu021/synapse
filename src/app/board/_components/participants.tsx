"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/ui/shared/tooltip";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const MAX_SHOWN_OTHER_USERS = 4;

const Participants = () => {
  const currentUser = useSelf();
  const users = useOthers();

  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="border bg-white rounded-xl absolute top-2 right-2 min-w-96">
      <div className="py-1 px-4">
        <div className="flex items-center gap-2">
          {currentUser && (
            <UserAvatar
              src={currentUser.info?.picture}
              name={`${currentUser.info?.name} (You)`}
              fallback={currentUser.info?.name?.[0]}
            />
          )}
          {users
            .slice(0, MAX_SHOWN_OTHER_USERS)
            .map(({ connectionId, info }) => (
              <UserAvatar
                otherUser
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
              />
            ))}
          {hasMoreUsers && (
            <UserAvatar
              name={`${users.length - MAX_SHOWN_OTHER_USERS} more`}
              fallback={`+${users.length - MAX_SHOWN_OTHER_USERS}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
  otherUser?: boolean;
}

const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
  otherUser,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={10}>
      <Avatar
        className={`h-10 w-10 border-2`}
        style={{
          borderColor,
        }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
}

export default Participants;
