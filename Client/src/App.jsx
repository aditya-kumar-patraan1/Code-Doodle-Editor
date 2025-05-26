import "./App.css";
import Header from "./components/Header.jsx";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./Auth/Login.jsx";
import Contact from "./components/Contact.jsx";
import Register from "./Auth/Register.jsx";
import RegisteredEmail from "./Auth/RegisteredEmail.jsx";
import EnterOTPforPassword from "./Auth/EnterOTPforPassword.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import FullScreen from "./CodeReviewer/FullScreen.jsx";
import Developer from "./components/Developer.jsx";
import FolderPage from "./components/FolderPage.jsx";
import { FileDataProvider } from "./Context/FileDataContext.jsx";
import StrapLayout from "./components/StrapLayout.jsx";
import GridLayout from "./components/GridLayout.jsx";
import ChatDesktop from "./ChatBox-Desktop/ChatDesktop.jsx";
import LobbyScreen from "./CameraSecurity/screens/Lobby.jsx";
import { MyScreen } from "./CameraSecurity/screens/MyScreen.jsx";
import "./index.css";
import VerifyEmail from "./Auth/verifyEmail.jsx";
import { useAppContext } from "./Context/AppContext.jsx";
import Instruction from "./components/Instruction.jsx";
import Ask from "./components/Ask.jsx";

function App() {
  const {userData} = useAppContext();
  const [isLightMode,setisLightMode] = useState(true);

  useEffect(()=>{
    setisLightMode(userData?.isLightMode);
  },[userData]);

  return (
    <>
      {/* <div id="root"> */}
        <Routes>
          <Route
            path="/Header"
            element={
              <Header
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/Ask"
            element={
              <Ask
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home isLightMode={isLightMode} setisLightMode={setisLightMode} />
            }
          />
          <Route
            path="/about"
            element={
              <About
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/ChatDesktop"
            element={
              <ChatDesktop
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/Contact"
            element={
              <Contact
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/LoginPage"
            element={
              <Login
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/RegisteredEmail"
            element={
              <RegisteredEmail
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/registerPage"
            element={
              <Register
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/EnterOTPforPassword"
            element={
              <EnterOTPforPassword
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/ResetPassword"
            element={
              <ResetPassword
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/RoomPage"
            element={
              <RoomPage
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/MyScreen/:roomId"
            element={
              <MyScreen
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/EditorPage/:roomid"
            element={
              <EditorPage
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route path="/StrapLayout" element={<StrapLayout />} />
          <Route path="/GridLayout" element={<GridLayout />} />
          <Route path="/workspace" element={<FolderPage isLightMode={isLightMode}/>} />
          <Route
            path="/CodeReviewer"
            element={
              <FullScreen
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/Instruction"
            element={
              <Instruction
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/verifyEmail"
            element={
              <VerifyEmail
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/LobbyPage"
            element={
              <LobbyScreen
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          <Route
            path="/Developer"
            element={
              <Developer
                isLightMode={isLightMode}
                setisLightMode={setisLightMode}
              />
            }
          />
          
        </Routes>
      {/* </div> */}
    </>
  );
}

export default App;
