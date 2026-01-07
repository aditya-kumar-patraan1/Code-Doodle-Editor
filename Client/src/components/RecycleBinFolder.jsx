import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Toaster, toast } from "react-hot-toast";
import { FaCopy} from "react-icons/fa";

function RecycleBinFolder() {
  const { userData } = useAppContext();
  console.log(userData?.allRecycleBinFiles);

  const [isCodeOpen, setisCodeOpen] = useState(false);
  const [codeIndex, setCodeIndex] = useState(null);
  const [code, setCode] = useState("");
  const [optionVisibility, setoptionVisibility] = useState(false);

  const handleOpenCode = (currIndex, currCode) => {
    // console.log(currCode);
    setisCodeOpen(true);
    setCodeIndex(currIndex);
    setCode(currCode);
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
    navigator.clipboard.writeText("");
  };

  const handleOptionsVisibility = () => {
    setoptionVisibility((prev) => !prev);
  };

  return (
    <>
      <Toaster />
      <div className="bg-red-500 relative w-screen h-screen">
        {codeIndex != null && (
          <div className="h-screen w-screen inset-0 bg-white/30 backdrop-blur-md z-50 flex justify-center items-center absolute">
            <div className="w-1/2 scroll-smooth h-5/6 bg-[#FFFFFF] p-6 rounded-xl shadow-lg text-black border">
              <div className="flex justify-between h-[8%] bg-transparent">
                <p className="text-lg sm:text-2xl font-bold mb-4 text-gray-800 pr-10">📁 File name</p>
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

        <div className="h-screen w-screen">
          <div className="h-[20%] w-[100%] bg-green-400 flex justify-between p-10">
            <div className="bg-blue-600">
              <p className="text-4xl font-semibold ">Recycle Bin</p>
              <p>search</p>
            </div>
            <div
              className="relative bg-green-800
            w-fit h-fit"
            >
              <button
                className="bg-red-500 text-white w-fit h-fit"
                onClick={handleOptionsVisibility}
              >
                Options
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
          <div className="h-[80%] bg-pink-600">
            <div className="flex flex-col gap-3 mx-auto w-5/6">
              {userData &&
                userData?.allRecycleBinFiles.map((item, index) => {
                  return (
                    <div
                      className="p-3 flex flex-col gap-2 rounded-lg
                    
                    bg-gray-950 hover:border-green-400 hover:bg-gray-900
                } border border-white cursor-pointer hover:border-1  transform duration-300 p-3 lg:p-6 rounded-lg text-white shadow-md flex items-center gap-4 hide-scrollbar justify-between"
                      onClick={() => handleOpenCode(index, item?.fileContent)}
                    >
                      <p className="p-2">{item.fileName}</p>
                      <p className="p-2">
                        Removed by : {item.removedBy}
                      </p>
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
