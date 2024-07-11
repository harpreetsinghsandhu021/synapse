import {
  ArrowBigRight,
  ArrowBigRightDash,
  Circle,
  MousePointer2,
  MoveRight,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import React from "react";
import { ToolButton } from "./toolButton";
import { CanvasMode, CanvasState, LayerType } from "../../../../types/canvas";
import { TbArrowMoveRight } from "react-icons/tb";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ToolBar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolBarProps) => {
  return (
    <div className="absolute top-56 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-xl p-1.5 flex gap-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          isActive={
            canvasState.mode === CanvasMode.none ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          onClick={() => setCanvasState({ mode: CanvasMode.none })}
          icon={MousePointer2}
        />
        <ToolButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          label="Text"
          icon={Type}
        />
        <ToolButton
          label="Sticky note"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          icon={StickyNote}
        />

        <ToolButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          label="Rectangle"
          icon={Square}
        />
        <ToolButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          label="Ellipse"
          icon={Circle}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          label="Pen"
          icon={Pencil}
        />
      </div>
      <div className="bg-white rounded-xl p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          onClick={undo}
          disabled={!canUndo}
          label="Undo"
          icon={Undo2}
        />
        <ToolButton
          onClick={redo}
          disabled={!canRedo}
          label="Redo"
          icon={Redo2}
        />
      </div>
    </div>
  );
};

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
}

export default ToolBar;
