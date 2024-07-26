"use client";
import React, { useCallback, useEffect, useState } from "react";

import {
  Tldraw,
  track,
  useEditor,
  DefaultMenuPanel,
  DefaultSharePanel,
  getSnapshot,
  loadSnapshot,
  TLStore,
} from "tldraw";
import "tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";
import TopBar from "../_components/topBar";

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";

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

    function saveDocument() {
      const { document: currDocument, session } = getSnapshot(editor.store);

      mutate({
        id: document?._id as Id<"documents">,
        json: JSON.stringify(currDocument) as string,
      });
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
              if (document.json) {
                loadSnapshot(
                  editor.store,
                  JSON.parse(document?.json as string)
                );
              }
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
