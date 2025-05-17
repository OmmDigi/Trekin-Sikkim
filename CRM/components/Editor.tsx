"use client";

import { useRef } from "react";
import { uploadFiles } from "./utils/uploadFiles";
import type { Config } from "jodit/esm/config";
import type { DeepPartial } from "jodit/esm/types";

import dynamic from "next/dynamic";

interface IProps {
  storageFolderName: string;
  onBlur?: (code: string) => void;
  defaultValue?: string;
}

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export const Editor = ({
  storageFolderName,
  onBlur,
  defaultValue = "",
}: IProps) => {
  const editor = useRef(null);

  const handleImageUpload = async (file: File) => {
    const { data, error } = await uploadFiles({
      files: [file],
      folder: storageFolderName,
    });
    if (error) {
      return null;
    }
    return data[0].url;
  };

  const config: DeepPartial<Config> = {
    readonly: false,
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",

    uploader: {
      insertImageAsBase64URI: false,
    },

    minHeight: 500,

    buttons: [
      // "source",
      "print",
      "about",
      "undo",
      "redo",
      "cut",
      "copy",
      "paste",
      "selectall",
      //   "pasteText",
      //   "pasteFromWord",
      "|",
      "find",
      //   "replace",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "superscript",
      "subscript",
      "|",
      "outdent",
      "indent",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "paragraph",
      "|",
      "classSpan",
      "spellcheck",
      "lineHeight",
      "|",
      "link",
      // "table",
      "hr",
      //   "symbol",
      "fullsize",
      "preview",
      "print",
      "file",
      "video",
      //   "emoji",
      "|",
      "align",
      "undo",
      "redo",
      "brush",
      "copyformat",
      //   "removeformat",
      "hr",
      "image", // keep Jodit image if you want
      {
        name: "customImageUpload",
        iconURL: "/image-up.png",
        tooltip: "Upload Image",
        exec: async (editor: any) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async () => {
            if (input.files?.[0]) {
              const url = await handleImageUpload(input.files[0]);
              if (url) {
                editor.selection.insertImage(url);
              } else {
                alert("Image upload failed.");
              }
            }
          };
          input.click();
        },
      },
    ],
  };

  return (
    typeof window !== "undefined" && (
      <JoditEditor
        ref={editor}
        config={config as any}
        tabIndex={1}
        editorRef={(editor) => editor.setEditorValue(defaultValue)}
        onBlur={onBlur}
      /> 
    )
  );
};
