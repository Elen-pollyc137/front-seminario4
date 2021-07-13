import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import AlbumsPage from "./components/albums/AlbumsPage";
import Album from "./components/albums/Album";
import * as serviceWorker from "./serviceWorker";

const Routes = () => (
  <Router>
    <div className="container section">
      <Switch>
        <Route exact path="/" component={AlbumsPage} />
        <Route exact path="/albums/:id" component={Album} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById("root"));
serviceWorker.unregister();
