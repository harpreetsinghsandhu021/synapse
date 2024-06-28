import React from "react";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { Hint } from "@/components/ui/shared/tooltip";

const OrganizationListBar = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (userMemberships.isLoading) {
    return <div>Lk</div>;
  }

  return (
    <ul className="flex mb-2 flex-col gap-2">
      {userMemberships.data
        ? userMemberships.data.map((member) => (
            <Item
              id={member.organization.id}
              key={member.organization.id}
              imageUrl={member.organization.imageUrl}
              name={member.organization.name}
            />
          ))
        : null}
    </ul>
  );
};

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}
export function Item({ id, imageUrl, name }: ItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({
      organization: id,
    });
  };

  return (
    <Hint side="right" sideOffset={20} label={name}>
      <div className="aspect-square relative">
        <Image
          src={imageUrl}
          onClick={onClick}
          alt={name}
          fill
          className={`rounded-full  cursor-pointer opacity-75 hover:opacity-100 transition ${isActive && "opacity-100"} `}
        />
      </div>
    </Hint>
  );
}

export default OrganizationListBar;
