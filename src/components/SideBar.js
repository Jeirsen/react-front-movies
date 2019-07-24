import React from "react";
import { SideBarItem } from "./SideBarItem";
import { Menu } from "semantic-ui-react";
import "./SideBar.css";

export class SideBar extends React.Component {
  render() {
    return (
      <Menu borderless vertical stackable fixed="left" className="side-nav">
        <SideBarItem highlight={true} label="Reservas" icon="home" />
        <SideBarItem label="Peliculas" icon="fire" />
      </Menu>
    );
  }
}
