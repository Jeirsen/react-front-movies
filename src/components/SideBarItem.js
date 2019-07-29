import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import "./SideBarItem.scss";

export function SideBarItem(props) {
  return (
    <div role="list" class="ui list">
      <div role="listitem" class="item">
        <i
          aria-hidden="true"
          class="grey inverted calendar alternate outline icon"
        />
        <div class="content">Reservas</div>
      </div>
      <div role="listitem" class="item">
        <i aria-hidden="true" class="grey inverted film icon" />
        <div class="content">Peliculas</div>
      </div>
    </div>
  );
}
