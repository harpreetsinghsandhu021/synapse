"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function RouteChangeListener() {
  const pathname = usePathname();
  const [changes, setChanges] = useState(0);
  const { mutate, isLoading } = useApiMutation(api.documents.updateDocument);

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);

    if (pathname === "/") {
      const id = localStorage.getItem("docId");
      const doc = localStorage.getItem("document");

      mutate({
        id: id as Id<"documents">,
        json: doc as string,
      });
    }
    setChanges((prev) => prev + 1);
  }, [pathname]);

  return null;
}
