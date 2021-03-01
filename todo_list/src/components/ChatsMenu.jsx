import React, { useState } from "react";
import MyTextField from "../utils/MyTextField";
import "./ChatsMenu.sass";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MyIcons from "../utils/MyIcons";

function ChatsMenu(props) {
  const [isOpen, setIsOpen] = useState(true);

  const chatsArray = [
    { name: "Alex", messages: 9 },
    { name: "Kato", messages: 10 },
    { name: "warm", messages: 300 },

  ];

  return (
    <div className="chatsMenu">
      <div className="chatsMenu-content">
        <div className="chatsMenu-content-search">
          <MyTextField label="Search"></MyTextField>
          <MyIcons>
            <SearchRoundedIcon />
          </MyIcons>
        </div>
        <div className="chatsMenu-content-chats">
          {chatsArray.map((item) => (
            <div className="chatsMenu-content-chats-item">
              <span className="chatsMenu-content-chats-item-name">{item.name}</span>
              <div className="chatsMenu-content-chats-item-messages">
                <span>{item.messages}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsMenu;
