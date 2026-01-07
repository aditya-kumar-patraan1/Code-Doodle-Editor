import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Toaster, toast } from "react-hot-toast";
import { FaCopy} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {motion} from 'framer-motion';
import { IoMdSettings } from "react-icons/io";

function RecycleBinFolder() {
  const { userData } = useAppContext();
  console.log(userData?.allRecycleBinFiles);

  const [isCodeOpen, setisCodeOpen] = useState(false);
  const [codeIndex, setCodeIndex] = useState(null);
  const [code, setCode] = useState("");
  const [file,setFile] = useState("");
  const [optionVisibility, setoptionVisibility] = useState(false);
  const [isDeleteOpen,setisDeleteOpen] = useState(false);

  const handleOpenCode = (currIndex, itemFile) => {
    // console.log(currCode);
    setisCodeOpen(true);
    setCodeIndex(currIndex);
    setFile(itemFile?.fileName);
    setCode(itemFile?.fileContent);
  };

  const handleCopyCode = () => {
    toast.success("Code code from clipboard");
    console.log("button clicked");
    console.log(code);
    navigator.clipboard.writeText(code);
  };

  const handleCloseCode = () => {
    setisCodeOpen(false);
    setCodeIndex(null);
    setCode(null);
    setFile("");
    navigator.clipboard.writeText("");
  };

  const handleOptionsVisibility = () => {
    setoptionVisibility((prev) => !prev);
  };

  const handleDeleteVisibility = () =>{
    setisDeleteOpen((prev)=>!prev);
  }

  return (
    <>
      <Toaster />
      <div className={`bg-[#000000] relative w-screen h-screen`}>
        {codeIndex != null && (
          <div className="h-screen w-screen inset-0 bg-white/30 backdrop-blur-md z-50 flex justify-center items-center absolute">
            <div className="w-1/2 scroll-smooth h-5/6 bg-[#FFFFFF] p-6 rounded-xl shadow-lg text-black border">
              <div className="flex justify-between h-[8%] bg-transparent">
                <p className="text-lg sm:text-2xl font-bold mb-4 text-gray-800 pr-10">📁 {file}</p>
                <button onClick={handleCloseCode} className=" text-xl sm:text-2xl font-bold text-gray-600 hover:text-red-500">&times;</button>
              </div>
              <div className="flex h-[92%] flex-col gap-0">
                <button
                  onClick={handleCopyCode}
                  className="self-end p-2 py-3 hover:text-blue-600 bg-transparent-700"
                >
                  <FaCopy size={20}/>
                </button>
                <div className="bg-transparent text-[#374151] whitespace-pre-wrap   overflow-auto">{code}</div>
              </div>
            </div>
          </div>
        )}

        {/* is delete open */}
        {isDeleteOpen && (
        <motion.div
        initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white border-2 border-gray-200 rounded-lg w-[90%] sm:w-3/4 md:w-1/2 lg:w-2/5 p-4 m-10 lg:m-0 sm:p-6 shadow-xl text-center max-w-[600px]">
            <p className="text-sm sm:text-lg font-light mb-4 leading-relaxed">
              Are you sure you want to delete this file? Type{" "}
              <span className="font-bold text-pink-600">
                "Delete {file}"
              </span>{" "}
              to delete the file from your workspace.
            </p>

            <input
              type="text"
              placeholder={`Enter Delete ${file}`}
              value={confirm}
              // onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />

            <div className="flex justify-between flex-row sm:flex-row justify-center sm:justify-between items-center mt-6 gap-3 sm:gap-4">
              <button
                // onClick={closeFile}
                className="sm:w-auto bg-pink-500 px-3 py-2 hover:bg-pink-600 text-white lg:px-6 lg:py-2 rounded-lg transition-all duration-300 active:scale-95"
              >
                Close
              </button>

              <button
                // onClick={checkValidity}
                className="sm:w-auto px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white lg:px-6 lg:py-2 rounded-lg transition-all duration-300 active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}

        <div className="h-screen w-screen">
          <div className="h-[20%] w-[100%] bg-transparent flex justify-between p-10">
            <div className="bg-transparent">
              <p className={`text-4xl font-semibold text-[#FFFFFF]`}>Recycle Bin</p>
              <p>search</p>
            </div>
            <div
              className="relative bg-transparent
            w-fit h-fit"
            >
              <button
                className="bg-transparent text-white w-fit h-fit"
                onClick={handleOptionsVisibility}
              >
                <IoMdSettings size={27} className="text-[#FFFFFF]"/>
              </button>
              <div className="bg-pink-500 absolute right-0 top-10">
                {optionVisibility && (
                  <ul>
                    <li>Grid Layout</li>
                    <li>Strap Layout</li>
                    <li>Delete all Files</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="h-[80%] bg-transparent">
            <div className="flex flex-col items-center gap-3 mx-auto w-5/6">
              {userData &&
                userData?.allRecycleBinFiles.map((item, index) => {
                  return (
                    <div
                      className="w-5/6 p-3 flex justify-between rounded-lg
                    bg-gray-950 hover:border-green-400 hover:bg-gray-900
                 border border-white cursor-pointer hover:border-1  transform duration-300 lg:p-6  text-white shadow-md gap-4 hide-scrollbar"
                      
                    >
                      <div onClick={() => handleOpenCode(index, item)} className="flex flex-col bg-red-500 w-1/2">
                        <p className="p-2">{item.fileName}</p>
                      <p className="p-2">
                        Removed by : {item.removedBy}
                      </p>
                      </div>
                      <button className={`text-1xl lg:text-3xl text-slate-500 hover:text-red-400 transform transition-all duration-300`}>
                        <MdDelete className="text-white" size={30} onClick={handleDeleteVisibility}/>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecycleBinFolder;
