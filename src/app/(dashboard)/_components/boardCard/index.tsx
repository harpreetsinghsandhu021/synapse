import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "./actions";
import { TbDots } from "react-icons/tb";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: favorite, isLoading: favoritePending } = useApiMutation(
    api.board.favorite
  );
  const { mutate: unFavorite, isLoading: unFavoritePending } = useApiMutation(
    api.board.unFavorite
  );

  const toggleFavourite = () => {
    if (!isFavorite) {
      favorite({ id: id as Id<"boards">, orgId: orgId }).then(() =>
        toast.success("board favorited successfully")
      );
    } else {
      unFavorite({ id: id as Id<"boards"> }).then(() =>
        toast.success("board unFavorited successfully")
      );
    }
  };

  return (
    <div>
      <div className="group aspect-[100/127] border rounded-xl flex flex-col justify-center overflow-hidden">
        <a href={`/board/${id}`} className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="p-4 object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity  outline-none">
              <TbDots className="text-white w-6 h-6 opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </a>
        <Footer
          isFavourite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavourite}
          disabled={false}
        />
      </div>
    </div>
  );
};

function Overlay() {
  return (
    <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black"></div>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-xl overflow-hidden">
      <Skeleton className="h-full bg-gray-300 w-full" />
    </div>
  );
};
export default BoardCard;
