import { updateDocument } from "@/actions/documents";
import { useEffect, useMemo } from "react";
import { getSnapshot, useEditor } from "tldraw";

export default function SnapshotToolbar({
  id,
  boardId,
}: {
  id: number | undefined;
  boardId: string;
}) {
  const editor = useEditor();

  const saveDocument = useMemo(
    () => async () => {
      const { document, session } = getSnapshot(editor.store);
      await updateDocument(id as number, JSON.stringify(document), boardId);
    },
    [editor, id, boardId]
  );

  useEffect(() => {
    const intervalId = setInterval(saveDocument, 10000);

    return () => clearInterval(intervalId);
  }, [saveDocument]);

  return null;
}
