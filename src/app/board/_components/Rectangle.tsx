import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "../../../../types/canvas";

type Props = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Rectangle({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      fill={fill ? colorToCss(fill) : "#000"}
      strokeWidth={2}
      stroke={selectionColor || "transparent"}
    />
  );
}
