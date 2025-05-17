import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import "froala-editor/js/froala_editor.min.js";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditorComponent from "react-froala-wysiwyg";

export default function CustomFroalaEditor() {
  return (
    // <FroalaEditor
    //   tag="textarea"
    //   config={{
    //     pluginsEnabled: ["align", "link"],
    //     language: "ro",
    //     events: {
    //       initialized: function (e : any) {
    //         var editor = this;
    //         console.log("@@@@@@initialized", editor, e);
    //       },
    //     },
    //   }}
    // />
    <FroalaEditorComponent tag="textarea" />
  );
}
