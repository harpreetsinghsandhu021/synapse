import React from "react";
import Canvas from "../_components/canvas";
import { Room } from "./room";
import { Loading } from "../_components/loader";

const ParticuarBoard = async ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default ParticuarBoard;
