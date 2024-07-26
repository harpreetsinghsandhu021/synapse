import { useOrganization } from "@clerk/nextjs";
import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import NewBoardButton from "../newBoardButton";
import BoardCard from "../boardCard";
import { Id } from "../../../../../convex/_generated/dataModel";

const Index = ({
  orgId,
  query,
}: {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}) => {
  let data = useQuery(api.boards.get, { orgId, ...query });

  if (!data) {
    return (
      <div className="h-full w-full ">
        <h2 className="text-3xl">
          {query.favorites ? "Favourite Boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Image src="/empty-search.svg" alt="Empty" height={140} width={140} />
        <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Try searching for something else
        </p>
      </div>
    );
  }

  if (!data?.length && query.favorites) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Image
          src="/empty-favourites.svg"
          alt="Empty"
          height={140}
          width={140}
        />
        <h2 className="text-2xl font-semibold mt-6">No favourite boards!</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Try favouriting a board
        </p>
      </div>
    );
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div className="h-full w-full ">
      <h2 className="text-3xl">
        {query.favorites ? "Favourite Boards" : "Team boards"}
      </h2>
      <div className=" overflow-hidden">
        <div className="grid no-scrollbar h-[80vh] overflow-y-scroll grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} />
          {data?.map((board: any) => (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName as string}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={board.isFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function EmptyBoards() {
  // const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: create, isLoading } = useApiMutation(api.board.create);
  const { mutate: createDocument, isLoading: isLoading2 } = useApiMutation(
    api.documents.createDocument
  );

  const handleClick = () => {
    if (!organization) return;

    create({
      title: "Untitled",
      orgId: organization.id,
    })
      .then((id: string) => {
        toast.success("Board created");
        createDocument({ boardId: id as Id<"boards"> }).then(() =>
          toast.success("Document created!")
        );
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button
          disabled={isLoading}
          className="rounded-xl px-4 bg-black  text-white"
          color={"black"}
          size="lg"
          onClick={handleClick}
        >
          Create board
        </Button>
      </div>
    </div>
  );
}

export default Index;
