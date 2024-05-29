import { useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

import "./home.css";


export default function Home({ user }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
    <Topbar />
    <div className="homeContainer">
    <button id="hamburgerBtn" className="hamburger-button" onClick={toggleSidebar}>
      ☰
    </button>
      <Sidebar isVisible={sidebarVisible} />

      <Feed />
      <Rightbar user={user} />

    </div>
    </>
  )
}
