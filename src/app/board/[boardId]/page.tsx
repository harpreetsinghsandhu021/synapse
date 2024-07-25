"use client";
import React, { useCallback, useEffect, useState } from "react";
// import Canvas from "../_components/canvas";
// import { Room } from "./room";
// import { Loading } from "../_components/loader";
import {
  DefaultColorStyle,
  DefaultStylePanel,
  TldrawUiButtonLabel,
  TLUiStylePanelProps,
  Tldraw,
  TldrawUiButton,
  track,
  useEditor,
  useRelevantStyles,
  DefaultStylePanelContent,
  DefaultMainMenu,
  TldrawUiMenuItem,
  DefaultMainMenuContent,
  TldrawUiMenuGroup,
  DefaultMenuPanel,
  DefaultSharePanel,
  getSnapshot,
  loadSnapshot,
  TLStore,
} from "tldraw";
import "tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";
import TopBar from "../_components/topBar";
import Participants, {
  ParticipantsSkeleton,
} from "../_components/participants";
import { Room } from "./room";
import { Loading } from "../_components/loader";
import { Button } from "@/components/ui/button";
import { useDebounceCallback } from "usehooks-ts";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

const HOST_URL = "ws://localhost:1234";

const ParticuarBoard = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  const store = useYjsStore({
    roomId: params.boardId,
    hostUrl: HOST_URL,
  });

  const document = useQuery(api.documents.getDocument, {
    id: params.boardId as Id<"boards">,
  });

  const CustomMenuPanel = () => {
    const editor = useEditor();

    const { isDarkMode } = editor.user.getUserPreferences();

    return (
      <>
        <TopBar isDarkMode={isDarkMode} boardId={params.boardId}>
          <div>
            <DefaultMenuPanel />
          </div>
        </TopBar>
        <SnapshotToolbar />
      </>
    );
  };

  const NameEditor = track(() => {
    return (
      <>
        <DefaultSharePanel />
      </>
    );
  });

  function SnapshotToolbar() {
    const editor = useEditor();
    const { mutate, isLoading } = useApiMutation(api.documents.updateDocument);
    localStorage.setItem("docId", `${document?._id}`);

    function saveDocument() {
      const { document: currDocument, session } = getSnapshot(editor.store);

      localStorage.setItem("document", JSON.stringify(currDocument));

      // mutate({
      //   id: document?._id as Id<"documents">,
      //   json: JSON.stringify(currDocument),
      // });
    }

    const intervalId = setInterval(saveDocument, 5000);

    return <></>;
  }

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        {document && (
          <Tldraw
            autoFocus
            onMount={(editor) => {
              loadSnapshot(editor.store, JSON.parse(document?.json as string));
            }}
            key={params.boardId}
            // persistenceKey={params.boardId}
            store={store}
            components={{
              SharePanel: NameEditor,
              PageMenu: null,
              DebugPanel: null,
              MenuPanel: CustomMenuPanel,
            }}
          />
        )}
      </div>
    </>
  );
};

export default ParticuarBoard;
