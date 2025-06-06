import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import generateContent from "./gemini";
import { AiFillSound } from "react-icons/ai";
import { FaCopy, FaEdit } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { VscRobot } from "react-icons/vsc";
import ShareCircleBold from "../assets/ShareCircleBold";
import { ImCross } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import "../App.css";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import { CgArrowsExpandUpLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Chat = ({ setisChatOpen, isLightMode, setisLightMode }) => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [chats, setChats] = useState([]);
  const [data, setData] = useState("");
  const [bot, setBot] = useState("");
  const [actualList, setactualList] = useState([]);
  const [count, setcount] = useState(0);
  const { userData, BACKEND_URL, getUserData } = useAppContext();
  const Navigate = useNavigate();

  useEffect(() => {
    if (count < 2 && userData?.allChats) {
      setactualList(userData.allChats);
      setcount((prev) => prev + 1);
    }
  }, [count, userData?.allChats]);

  function formatTime(isoString) {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  function speakText(mytext) {
    if (!mytext) return;
    const utterance = new SpeechSynthesisUtterance(mytext);
    window.speechSynthesis.speak(utterance);
  }

  async function onSend() {
    if (data.trim() === "") return;
    setChats((prev) => [...prev, { user: data, bot: null }]);
    let O = await generateContent(data);
    let output = O.replace(/\*/g, "");
    setBot(output);
  }

  useEffect(() => {
    const doAddQuery = async () => {
      const tempQ = data;
      setData("");
      await axios
        .post(
          `${BACKEND_URL}/api/chats/addDesktopChats`,
          { date: Date.now(), bot, user: tempQ },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.status === 1) {
            getUserData();
            setactualList((prev) => [
              ...prev,
              { bot, user: tempQ, date: Date.now() },
            ]);
          }
        });
    };
    if (bot) doAddQuery();
  }, [bot]);

  return (
    <div
      className={`w-[74vw] h-[60vh] lg:w-1/4 lg:h-5/6 fixed bottom-2 right-2 z-50 flex flex-col rounded-xl shadow-xl border overflow-hidden ${
        isLightMode ? "bg-white" : "bg-gray-950"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center gap-2">
          <CgArrowsExpandUpLeft
            onClick={() => Navigate("/ChatDesktop")}
            className={`cursor-pointer ${
              isLightMode ? "text-black" : "text-white"
            }`}
          />
          <span
            className={`text-lg font-bold ${
              isLightMode ? "text-blue-600" : "text-white"
            }`}
          >
            ChatBox
          </span>
        </div>
        <ImCross
            className={`cursor-pointer absolute right-6 text-sm text-gray-500 ${
              isLightMode ? "hover:text-blue-500" : "hover:text-white"
            } transform transition duration-300 hover:scale-110 hover:rotate-90`}
            onClick={() => setisChatOpen((prev) => !prev)}
          />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 hide-scrollbar">
        {actualList.map((item, index) => (
          <div key={index} className="space-y-2">
            {/* User */}
            <div
              className={`p-3 rounded-md flex gap-3 items-start justify-between ${
                isLightMode
                  ? "bg-gray-100 text-black"
                  : "bg-gray-900 text-white"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src="https://th.bing.com/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?rs=1&pid=ImgDetMain"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">{item.user}</div>
                  <div className="text-xs text-gray-400">
                    {formatTime(item.date)}
                  </div>
                </div>
              </div>
              <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
            {/* Bot */}
            <div
              className={`p-3 rounded-md flex gap-3 justify-between items-start ${
                isLightMode ? "bg-blue-100 text-black" : "bg-black text-white"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
                  className="w-8 h-8 rounded-full"
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
                  <div className="text-xs text-gray-400 mt-1">
                    {formatTime(item.date)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-blue-500">
                <AiFillSound
                  onClick={() => speakText(item.bot)}
                  className="cursor-pointer hover:text-blue-700"
                />
                <CopyToClipboard text={item.bot} onCopy={() => setCopied(true)}>
                  <FaCopy className="cursor-pointer hover:text-blue-700" />
                </CopyToClipboard>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className={`flex items-center gap-2 p-3 ${
          isLightMode ? "bg-white" : "bg-black"
        }`}
      >
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter your query"
          className={`flex-1 px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 ${
            isLightMode
              ? "bg-white text-black border-gray-300 focus:ring-blue-400"
              : "bg-gray-800 text-white border-gray-700 focus:ring-green-400"
          }`}
        />
        <button
          onClick={onSend}
          className={`p-2 rounded-md transition-transform duration-200 hover:scale-95 ${
            isLightMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <IoSend className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
