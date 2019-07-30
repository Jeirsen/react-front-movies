import React from "react";
import "./SideBarItem.scss";
import { NavLink } from "react-router-dom";

const SideBarItem = props => {
  return (
    <div role="list" className="ui list">
      <div role="listitem" className="item">
        <i
          aria-hidden="true"
          className="grey inverted calendar alternate outline icon"
        />
        <NavLink className="content" to="/booking">
          Reservas
        </NavLink>
      </div>
      <div role="listitem" className="item">
        <i aria-hidden="true" className="grey inverted film icon" />
        <NavLink className="content" to="/">
          Peliculas
        </NavLink>
      </div>
    </div>
  );
};

export default SideBarItem;
