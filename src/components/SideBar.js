import React from "react";
import { SideBarItem } from "./SideBarItem";
import { Menu } from "semantic-ui-react";
import "./SideBar.css";

export class SideBar extends React.Component {
  render() {
    return (
      <Menu borderless vertical stackable fixed="left" className="side-nav">
        <div class="ui container">
          <img
            src="https://blog.placeit.net/wp-content/uploads/2018/01/placeit-logo-white-1024x252.png"
            style={{ width: "15rem" }}
          />
        </div>
        <SideBarItem />
      </Menu>
    );
  }
}
