import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import ListMovies from "./components/ListMovies";
import BookingList from "./components/BookingList";
import NotFound from "./components/NotFound";
import "./App.css";

import "semantic-ui-css/semantic.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function App() {
  return (
    <React.Fragment>
      <div className="container" style={{ paddingLeft: "20% " }}>
        <BrowserRouter>
          <SideBar />
          <Switch>
            <Route exact path="/" component={ListMovies} />
            <Route path="/booking" component={BookingList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
