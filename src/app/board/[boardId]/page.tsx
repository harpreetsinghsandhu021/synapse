"use client";

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
import TopBar from "../_components/topBar";
import { getDocument } from "@/actions/documents";
import { useEffect, useState } from "react";
import { Document } from "@prisma/client";
import SnapshotToolbar from "../_components/snapShotToolbar";
import Loader from "@/components/auth/loader";
import { useSyncDemo } from "@tldraw/sync";

const ParticuarBoard = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  const store = useSyncDemo({ roomId: params.boardId });

  const [document, setDocument] = useState<null | Document>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getCurrentDocument() {
    setIsLoading(true);
    const document = await getDocument(params.boardId);
    setIsLoading(false);

    if (document?.status === 200) {
      setDocument(document?.document as Document);
    }
  }

  useEffect(() => {
    getCurrentDocument();
  }, []);

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
        <SnapshotToolbar id={document?.id} boardId={params.boardId} />
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

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        {!isLoading && (
          <Tldraw
            autoFocus
            onUiEvent={(e) => console.log(e)}
            onMount={(editor) => {
              if (document?.json) {
                loadSnapshot(
                  editor.store,
                  JSON.parse(document?.json as string)
                );
              }
            }}
            key={params.boardId}
            store={store}
            components={{
              SharePanel: NameEditor,
              PageMenu: null,
              DebugPanel: null,
              MenuPanel: CustomMenuPanel,
              Spinner: Loader,
              LoadingScreen: Loader,
            }}
          />
        )}
      </div>
    </>
  );
};

export default ParticuarBoard;
