import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import aliveImage from "../assets/alivery.png";
import home from "../assets/homey.png";
import chat from "../assets/chaty.png";
import Switch from "react-switch";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname === "/chat";

  const handleSwitchChange = (checked) => {
    navigate(checked ? "/chat" : "/");
  };

  return (
    <Navbar.Collapse>
      <Nav className="mr-auto nav-container">
        <div id="main-logo" className="logo">
          <img src={aliveImage} alt="Alive" />
          <span className="dropdown-text logo-margin">GPT</span>
        </div>
        <div id="switch" className="switch-container">
          <Switch
            className="custom-switch"
            onChange={handleSwitchChange}
            checked={isChatPage}
            offColor="#ccc"
            onColor="#ccc"
            uncheckedIcon={false}
            checkedIcon={false}
            height={40}
            width={90}
            handleDiameter={30}
            checkedHandleIcon={
              <div className="switch-handle-background">
                <div className="switch-handle-icon switch-checked-handle-icon">
                  <img src={chat} alt="chat" />
                </div>
              </div>
            }
            uncheckedHandleIcon={
              <div className="switch-handle-background">
                <div className="switch-handle-icon switch-unchecked-handle-icon">
                  <img src={home} alt="Homepage" />
                </div>
              </div>
            }
          />
        </div>
      </Nav>
    </Navbar.Collapse>
  );
};

export default Navigation;
