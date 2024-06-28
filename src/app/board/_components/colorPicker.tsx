"use client";
import { colorToCss } from "@/lib/utils";
import { Color } from "../../../../types/canvas";
import { ColorResult, SketchPicker } from "react-color";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  onChange: (color: Color) => void;
};

export default function ColorPicker({ onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState<Color>({ r: 117, g: 107, b: 107 });

  return (
    <div className={" grid grid-cols-4"}>
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
      {/* <ColorButton
        color={{ r: 82, g: 82, b: 82 }}
        onClick={() => setShowPicker(!showPicker)}
      /> */}
      <button
        className={"color_swatch_button "}
        onClick={() => setShowPicker(!showPicker)}
      >
        <div className={"color_swatch border flex items-center justify-center"}>
          <Plus />
        </div>
      </button>

      {showPicker && (
        <SketchPicker
          color={color}
          onChangeComplete={(color: ColorResult) => {
            console.log(color.rgb);
            setColor(color.rgb);

            onChange(color.rgb);
          }}
          className="absolute top-[90%] left-[55%]"
        />
      )}
    </div>
  );
}

function ColorButton({
  onClick,
  color,
}: {
  onClick: (color: Color) => void;
  color: Color;
}) {
  return (
    <button className={"color_swatch_button "} onClick={() => onClick(color)}>
      <div
        className={"color_swatch border"}
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
}
