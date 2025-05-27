"use client";

import React, { useEffect, useRef } from "react";
import "ckeditor5/ckeditor5.css";
import CKEditorComponent from "../CKEditorComponent";

export default function EditorCk() {
  const textEditorContentRef = useRef("");

  useEffect(() => {
    function handleMessage(event: any) {
      // Optionally verify origin: if (event.origin !== "http://your-iframe-origin.com") return;
      if (event.data?.type === "EDITOR_CONTENT") {
        console.log("Received content from iframe:", event.data.content);
        // Save to state, form, etc.
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    // <CKEditorComponent
    //   storageFolderName="some"
    //   textEditorContentRef={textEditorContentRef}
    // />
    <iframe
      className="h-screen w-full"
      src="http://127.0.0.1:5501/Editor/index.html"
    ></iframe>
  );
}
