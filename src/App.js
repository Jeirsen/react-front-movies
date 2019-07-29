import React from "react";
import { SideBar } from "./components/SideBar";
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <React.Fragment>
      <SideBar />
      <div className="container" style={{ paddingLeft: "20% " }}>
        <div className="segment">
          <Header as="h3" textAlign="right">
            Float Right
          </Header>
          <Header as="h2" textAlign="left">
            Peliculas
          </Header>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
