import React from "react";
import "./Sidebar.css";

import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import profilepic from "./assets/images/profilepic.jpg";
import SidebarChat from "./SidebarChat";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  let navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={profilepic} />
        <div className="sidebar__headerRight">
          <IconButton>
            <span onClick={logout}>
              <LogoutIcon />
            </span>
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
