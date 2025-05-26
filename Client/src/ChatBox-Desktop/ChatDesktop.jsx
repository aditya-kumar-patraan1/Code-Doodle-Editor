import { useEffect, useState } from "react";
import "../App.css";
import { IoSend } from "react-icons/io5";
import { AiFillSound } from "react-icons/ai";
import { FaCopy, FaEdit } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { VscRobot } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import generateContent from "../ChatBox/gemini";
import ShareCircleBold from "../assets/ShareCircleBold";
import { MdOutlineDelete } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import "../app.css";

const ChatDesktop = ({ isLightMode, setisLightMode }) => {
  const Navigate = useNavigate();
  const { userData, BACKEND_URL, getUserData } = useAppContext();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [chats, setChats] = useState([]);
  const [data, setData] = useState(""); //mera question
  const [bot, setBot] = useState(""); //mera answer
  const [myclass, setClass] = useState("child-hidden");
  const [isOpen, setisOpen] = useState(true);
  const [myval, setmyval] = useState("open");
  const [applied, setapplied] = useState("show");
  const [myquery, setmyquery] = useState("");
  const [tempUpdate, setTempUpdate] = useState("");
  const [remainFix, setremainFix] = useState("");
  const [delIsOpen, setDelIsOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [actualList, setactualList] = useState([]);
  const [count, setcount] = useState(0);

  useEffect(() => {
    if (count < 2 && userData?.allChats) {
      setactualList(userData.allChats);
      setcount((prev) => prev + 1);
    }
  }, [count, userData?.allChats]);

  function formatTime(isoString) {
    const date = new Date(isoString);

    // Format options
    const options = {
      day: "2-digit",
      month: "short", // use '2-digit' for numeric month
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  // console.log("USER DATA IS BELOW : ");

  // useEffect(() => console.log(userData), [userData]);

  function click(data) {
    setapplied(data ? "hidden" : "show");
    setClass(data ? "child-show" : "child-hidden");
    setmyval(data ? "close" : "open");
    setisOpen(!data);
  }

  function fixData(e) {
    setData(e.target.value);
  }

  function speakText(mytext) {
    if (!mytext) return;
    const utterance = new SpeechSynthesisUtterance(mytext);
    window.speechSynthesis.speak(utterance);
  }

  // console.log("actualList is : ");
  // console.log(actualList);

  async function onSend() {
    if (data.trim() === "") return;

    let O = await generateContent(data);
    let output = await O.replace(/\*/g, "");
    setBot(output);
  }

  useEffect(() => {
    // console.log("Bot aara hai : " + bot);
    // console.log("USER ara hai : " + data);

    const doAddQuery = async () => {
      const tempQ = data;
      setData("");
      await axios
        .post(
          `${BACKEND_URL}/api/chats/addDesktopChats`,
          {
            date: Date.now(), // 🟢 Fixed here
            bot,
            user: tempQ,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.status === 1) {
            // console.log("Query get Added to Database");
            getUserData();
            setactualList((prev) => [
              ...prev,
              { bot, user: tempQ, date: Date.now() },
            ]);
          } else {
            // console.log("New Entry not added");
          }
        })
        .catch((e) => {
          // console.log("Internal error in adding query to DB");
        });
    };

    if (bot) {
      doAddQuery();
    }
  }, [bot]);

  function perform(mylastquery) {
    click(isOpen);
    setmyquery(mylastquery);
    setremainFix(mylastquery);
  }

  function perform2(updatedQuery) {
    setData(updatedQuery);
    click(isOpen);
  }

  async function deleteAllDesktopChats() {
    setDelIsOpen(true);
  }

  async function checkValidity() {
    const realQuery = "delete chat history";
    if (confirm.toLowerCase() === realQuery) {
      await axios
        .post(
          `${BACKEND_URL}/api/chats/deleteDesktopChats`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setConfirm("");
          setactualList([]);
          toast.success("History Chats deleted successfully");
          setDelIsOpen(false);
        })
        .catch((e) => {
          // console.log("Internal Error in deleting from Database");
        });
    } else {
      toast.error("Please type 'Delete Chat history'");
    }
  }

  async function closeScreen() {
    setDelIsOpen(false);
  }

  function ending() {
    click(isOpen);
    setmyquery(remainFix);
    setremainFix("empty");
  }

  function copyKar() {
    toast.success("Copied to Clipboard");
  }

  function fixData2(e) {
    setTempUpdate(e.target.value);
    setmyquery(e.target.value);
  }

  return (
    <>
      <Toaster />
      <div
        className={`fixed inset-0 z-50 ${
          isLightMode ? "bg-gray-100" : "bg-gray-950"
        } flex items-center justify-center`}
      >
        <div
          className={`w-full h-full sm:rounded-none overflow-hidden flex flex-col border border-gray-300 ${
            isLightMode ? "bg-white" : "bg-gray-950"
          }`}
        >
          {/* Header */}
          <div className=" shadow-md px-4 py-3 flex">
            <div className=" pl-3 sm:text-2xl font-bold w-full flex justify-between items-center gap-2">
              <div className="flex gap-6 items-center">
                <ShareCircleBold
                  onClick={() => Navigate("/")}
                  className={`${
                    isLightMode ? "text-black" : "text-white"
                  } cursor-pointer`}
                />
                <span
                  className={`${isLightMode ? "text-blue-600" : "text-white"}`}
                >
                  ChatBox
                </span>
              </div>
              <button
                className={`text-black text-2xl hover:text-red-700 hover:cursor-pointer hover:scale-110 transform transition-all duration-300 `}
                onClick={() => deleteAllDesktopChats()}
              >
                <MdOutlineDelete
                  className={`hover:text-red-500 ${
                    isLightMode ? "text-black" : "text-white"
                  }`}
                />
              </button>
            </div>
          </div>

          {delIsOpen && (
            <div
              className={`${!isOpen ? "hidden" : "fixed"} inset-0 ${
                isLightMode
                  ? "bg-black bg-opacity-30"
                  : "bg-black bg-opacity-50"
              } text-black flex justify-center backdrop-blur-sm items-center z-50 px-4`}
            >
              <div
                className={`${
                  isLightMode
                    ? "bg-white border-gray-200 text-black"
                    : "bg-gray-900 border-gray-700 text-white"
                } border-2 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6`}
              >
                <p className="text-base sm:text-lg font-light mb-4 text-center">
                  Are You Sure to delete this File? Type{" "}
                  <span className="font-bold text-pink-600">
                    "Delete Chat History"
                  </span>{" "}
                  to delete the file from your workspace.
                </p>

                <input
                  type="text"
                  placeholder={`Enter 'Delete Chat History'`}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 mt-2 sm:mt-4 focus:outline-none focus:ring-2 ${
                    isLightMode
                      ? "bg-gray-100 text-black border-gray-300 focus:ring-blue-400"
                      : "bg-gray-800 text-white border-gray-600 focus:ring-orange-400"
                  }`}
                />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
                  <button
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-all duration-300 active:scale-95 ${
                      isLightMode
                        ? "bg-pink-500 text-white hover:bg-pink-600"
                        : "bg-orange-500 text-black hover:bg-orange-600"
                    }`}
                    onClick={closeScreen}
                  >
                    Close
                  </button>

                  <button
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-all duration-300 active:scale-95 ${
                      isLightMode
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-green-500 text-black hover:bg-green-600"
                    }`}
                    onClick={checkValidity}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            <div className="space-y-4">
              {actualList.map((item, index) => (
                <div key={index} className="space-y-2">
                  {/* User Message */}
                  <div
                    className={`p-4 ${
                      isLightMode
                        ? "bg-gray-100 text-black"
                        : "bg-gray-900  text-white"
                    }  rounded-md flex justify-between items-start`}
                  >
                    <div className="flex gap-3">
                      <img
                        src="https://th.bing.com/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?rs=1&pid=ImgDetMain"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-semibold">{item.user}</div>
                        <div className="text-xs text-gray-500">
                          {formatTime(item.date)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => perform(item.user)}
                      className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                  </div>

                  {/* Bot Response */}
                  <div
                    className={`p-4 rounded-md flex justify-between items-start ${
                      isLightMode
                        ? "bg-blue-100 text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm">
                          {item.bot == null ? (
                            <img
                              className="w-5 h-5"
                              src="https://cdnl.iconscout.com/lottie/premium/thumb/loader-dot-dark-point-animation-6790347-5577789.gif"
                            />
                          ) : (
                            item.bot
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatTime(item.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-blue-500">
                      <button onClick={() => speakText(item.bot)}>
                        <AiFillSound className="hover:cursor-pointer hover:text-blue-700" />
                      </button>
                      <CopyToClipboard
                        className="hover:cursor-pointer hover:text-blue-700"
                        text={item.bot}
                        onCopy={() => setCopied(true)}
                      >
                        <button>
                          <FaCopy onClick={() => copyKar()} />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div
            className={` px-4 py-3 flex gap-2 items-center ${
              isLightMode ? "bg-white" : "bg-gray-950"
            }`}
          >
            <input
              type="text"
              value={data}
              onChange={fixData}
              placeholder="Enter your query"
              className={`flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                isLightMode ? "text-black" : " text-white bg-transparent"
              }`}
            />
            <button
              onClick={() => onSend()}
              className={`bg-blue-500 cursor-pointer text-white rounded-md px-4 py-2 m-2 my-3 hover:scale-100 transform transition-all ease-in-out hover:active:scale-90 ${
                isLightMode
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              <IoSend className="text-lg" />
            </button>
          </div>

          {/* Edit Modal */}
          <div
            className={`${isOpen ? "hidden" : "fixed"} inset-0 ${
              isLightMode ? "bg-black bg-opacity-20" : "bg-black bg-opacity-40"
            } flex justify-center items-center backdrop-blur-lg z-50`}
          >
            <div
              className={`p-6 rounded-lg shadow-xl w-[90%] max-w-xl border ${
                isLightMode
                  ? "bg-white border-gray-200 text-black"
                  : "bg-gray-900 border-gray-700 text-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">
                Do you want to edit?
              </h3>

              <textarea
                rows="6"
                defaultValue={myquery}
                onChange={fixData2}
                className={`w-full rounded-md px-4 py-2 text-sm resize-none mt-2 focus:outline-none focus:ring-2 ${
                  isLightMode
                    ? "bg-gray-100 text-black border border-gray-300 focus:ring-blue-400"
                    : "bg-gray-800 text-white border border-gray-600 focus:ring-orange-400"
                }`}
              ></textarea>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => perform2(tempUpdate)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium hover:scale-105 transition-all duration-300 active:scale-95 ${
                    isLightMode
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-green-500 text-black hover:bg-green-600"
                  }`}
                >
                  <IoSend className="text-lg" />
                  Send
                </button>

                <button
                  onClick={ending}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 active:scale-95 border ${
                    isLightMode
                      ? "text-black border-black hover:bg-black hover:text-white"
                      : "text-white border-white hover:bg-red-600 hover:border-red-600"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDesktop;
