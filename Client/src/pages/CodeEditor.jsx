import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "../App.css";
import {toast,Toaster} from "react-hot-toast";
//added
import { useState } from "react";
import { motion } from "framer-motion";
import { GoAlertFill } from "react-icons/go";
import { useAppContext } from "../Context/AppContext";

const CodeEditor = ({ socketRef, roomid,username,codeChange,setfileContent }) => {
  const editorRef = useRef(null);
  //added
  const { addFileToRecycleBin } = useAppContext();
  const [open, setopen] = useState(false);
  const [fileName, setfileName] = useState("");
  const isLightMode = false;
  const [whoChangedCode, setWhoChangedCode] = useState("");
  const [FileRecoveryCode, setFileRecoveryCode] = useState("");
  const [isExist, setisExist] = useState(false);
  

  const handleCloseDialoug = () => {
    setopen(false);
    setfileName("");
  };

  // console.log("Changed by : ", whoChangedCode);
  // console.log("File Name is : ", fileName);
  // console.log("File Content is : ", FileRecoveryCode);

  const handleAddingToRecycleBin = async () => {
    if (fileName.trim() === "") {
      toast.error("File name cannot be empty");
      return;
    }
    const response = await addFileToRecycleBin({
      removedBy: whoChangedCode,
      fileContent: FileRecoveryCode,
      fileName: fileName,
    });
    //console.log("Response from adding to recycle bin:", response);
    if(response.data.status == 2){
      setisExist(true);
    }
    else{
      setisExist(false);
      if(response.data.status==0){
        toast.error("Error adding file to recycle bin");
        setfileName("");
      }
      else{ 
        toast.success("File added to recycle bin");
      }
    }
  };

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
            if (
                preservedCode.trim() == "" ||
                preservedCode == null ||
                preservedCode.length <= 1
              ) {
                // console.log("abe bhai kum hai length");
              } else {
                // toast.success(
                //   `Changed by ${whoChanged}, Now the editor is empty ${preservedCode}`
                // );
                setWhoChangedCode(whoChanged);
                setFileRecoveryCode(preservedCode);
                //added
                setopen(true);
              }
            // toast.success(`Code removed by ${whoChanged}`);
            // toast.success(`and code is : ${preservedCode}`)
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
      {open && (
       <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center h-screen justify-center bg-black/30"
        >
          <div
            className={`rounded-2xl m-6 lg:m-0 p-4 h-auto shadow-lg lg:p-6 w-full max-w-md flex flex-col gap-5 ${
              isLightMode ? "bg-white" : "bg-gray-950"
            }`}
          >
            <div className="flex flex-col sm:flex-row bg-transparent gap-4 sm:gap-7 my-3 items-center w-[100%] px-3">
              <GoAlertFill className="bg-transparent text-[#F0C21C] text-5xl" />
              <div className="text-sm font-light text-white flex flex-col">
                <p>
                  Code is trying to be deleted by{" "}
                  <span className="font-bold">{whoChangedCode}.</span>
                </p>
                <p>Provide file name to store in Recycle Bin</p>
                {/* <p>{FileRecoveryCode}</p> */}
              </div>
            </div>
            {/* Input Section */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="myFileName"
                className={`text-sm font-medium ${
                  isLightMode ? "text-gray-700" : "text-white"
                }`}
              >
                File Name:
              </label>
              <input
                type="text"
                id="myFileName"
                placeholder="Enter File Name"
                value={fileName}
                onChange={(e) => setfileName(e.target.value)}
                className={`p-2 rounded-lg border focus:outline-none focus:ring-2 transition w-full ${
                  isLightMode
                    ? "border-gray-300 focus:ring-blue-500 text-gray-900 bg-white"
                    : "border-gray-700 focus:ring-green-500 text-white bg-black placeholder-gray-400"
                }`}
              />
            </div>

            {isExist && (
              <p className="text-red-500 text-center lg:text-start text-sm lg:text-1xl">
                **File with same name already exist
              </p>
            )}
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                onClick={() => handleAddingToRecycleBin()}
                className={`text-white px-4 py-2 rounded-lg text-sm md:text-base transition-all hover:scale-95 active:scale-90 w-full sm:w-auto ${
                  isLightMode
                    ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
                    : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                }`}
              >
                Add to Recycle Bin
              </button>
              <button
                onClick={() => handleCloseDialoug()}
                className={`text-white px-4 py-2 rounded-lg text-sm md:text-base transition-all hover:scale-95 active:scale-90 w-full sm:w-auto ${
                  isLightMode
                    ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    : "bg-gray-800 hover:bg-gray-700 active:bg-gray-600"
                }`}
              >
                Close
              </button>
            </div>

            {/* Link to workspace */}
            <button
              type="button"
              className={`cursor-pointer text-end text-sm hover:underline ${
                isLightMode ? "text-blue-700" : "text-green-400"
              }`}
              onClick={() => navigate("/workspace")}
            >
              View Recycle Bin
            </button>
          </div>
        </motion.div>
      )}
      <textarea id="realtimeeditor" className="overflow-auto hide-scrollbar"/>
    </>
  );
};

export default CodeEditor;
