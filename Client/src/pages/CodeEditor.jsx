import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "../App.css";
import {toast,Toaster} from "react-hot-toast";

const CodeEditor = ({ socketRef, roomid,username,codeChange,setfileContent }) => {
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
        socketRef.current.emit("code-change", { username,roomid, code });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-changed", ({ whoChanged,ChangerSocketId,code }) => {
        if (code !== null) {
          if(code==""){
            const preservedCode=editorRef.current.getValue();
            toast.success(`Code removed by ${whoChanged}`);
            toast.success(`and code is : ${preservedCode}`)
          }
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      if(socketRef.current){
        socketRef.current.off("code-change");
      }
    };
  }, [socketRef.current]);

  return (
    <>
      <Toaster/>
      <textarea id="realtimeeditor" className="overflow-auto hide-scrollbar"/>
    </>
  );
};

export default CodeEditor;
