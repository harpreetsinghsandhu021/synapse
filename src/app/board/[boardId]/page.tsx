"use client";
import React, { useEffect } from "react";
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
} from "tldraw";
import "tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";
import TopBar from "../_components/topBar";
import Participants, {
  ParticipantsSkeleton,
} from "../_components/participants";
import { Room } from "./room";
import { Loading } from "../_components/loader";

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

  const CustomMenuPanel = track(() => {
    const editor = useEditor();

    const { isDarkMode } = editor.user.getUserPreferences();

    return (
      <TopBar isDarkMode={isDarkMode} boardId={params.boardId}>
        <div>
          <DefaultMenuPanel />
        </div>
      </TopBar>
    );
  });

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
        <Tldraw
          autoFocus
          store={store}
          components={{
            SharePanel: NameEditor,
            PageMenu: null,
            DebugPanel: null,
            MenuPanel: CustomMenuPanel,
          }}
        />
      </div>
    </>
  );
};

export default ParticuarBoard;
