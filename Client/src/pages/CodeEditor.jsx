import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "../App.css";

const CodeEditor = ({ socketRef, roomid, codeChange,setfileContent }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(
      document.getElementById("realtimeeditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    editorRef.current = editor;
    editor.setSize(null, "100%");

    editor.on("change", (instance, changes) => {
      if (!socketRef.current) return;
      const { origin } = changes;
      const code = instance.getValue();
      codeChange(code);

      setfileContent(code);

      // console.log(code);

      if (origin !== "setValue") {
        socketRef.current.emit("code-change", { roomid, code });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-changed", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  return (
    // <div style={{ height: "100vh" }}>
      <textarea id="realtimeeditor" className="overflow-auto hide-scrollbar"/>
    // {/* </div> */}
  );
};

export default CodeEditor;
