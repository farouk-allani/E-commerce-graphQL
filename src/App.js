import "./App.css";
import Navbar from "./components/navBar/Navbar";
import GalleryView from "./views/GalleryView";
import Product2 from "./views/GalleryView/Product";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Cart from "./components/Cart/Cart";

export class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Switch>
          <Route
            exact
            path={["/", "/all"]}
            component={() => <GalleryView categoryTitle={"all"} />}
          />
          <Route
            path="/clothes"
            component={() => <GalleryView categoryTitle={"clothes"} />}
          />
          <Route
            path="/tech"
            component={() => <GalleryView categoryTitle={"tech"} />}
          />
          <Route
            path={["/all /:id", "/tech /:id", "/clothes /:id"]}
            component={() => <Product2 />}
          />
          <Route path="/cart" component={() => <Cart />} />
        </Switch>
      </div>
    );
  }
}

export default App;
