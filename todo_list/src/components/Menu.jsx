import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.sass";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MyIcons from "../utils/MyIcons";

function Menu(props) {
  const [isOpen, setIsOpen] = useState(true);

  const linkArray = [
    { url: "/users", title: GroupRoundedIcon },
    { url: "/chats", title: ForumRoundedIcon },
    { url: "/knowledgeBase", title: MenuBookRoundedIcon },
  ];

  return (
    <div className={"menu " + (isOpen ? "menu-open" : "menu-close")}>
      <div className="menu-content">
        <div className="menu-content-links">
          {linkArray.map((el) => (
            <Link to={el.url}>
              <MyIcons>{React.createElement(el.title)}</MyIcons>
            </Link>
          ))}
        </div>

        <div className="menu-content-collapse">
          <Link to="/login">
            <MyIcons>
              <ExitToAppRoundedIcon />
            </MyIcons>
          </Link>
          <MyIcons click={() => setIsOpen(!isOpen)}>
            {isOpen ? <ArrowBackRoundedIcon /> : <ArrowForwardRoundedIcon />}
          </MyIcons>
        </div>
      </div>
    </div>
  );
}

export default Menu;
