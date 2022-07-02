import "./App.css";
import client from "./graphQL/gqlClient";
import { navigationQuery } from "./graphQL/queries";
import Navbar from "./components/navBar/Navbar";
import GalleryView from "./views/GalleryView";
import Product2 from "./views/GalleryView/Product";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Cart from "./components/Cart/Cart";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [],
    };
  }
  componentDidMount() {
    client
      .query({
        query: navigationQuery,
      })
      .then((result) => {
        this.setState({ types: result.data.categories.map((cat) => cat.name) });
      })
      .catch((err) => console.log("navigation query error", err));
  }

  render() {
    return (
      <div className="app">
        {this.state.types.length && (
          <>
            <Navbar categories={this.state.types} />
            <Switch>
              {this.state.types.map((type) => (
                <Route
                  key={type}
                  exact
                  path={`/${type}`}
                  component={() => <GalleryView categoryTitle={type} />}
                />
              ))}
              <Route
                exact
                path="/"
                component={() => (
                  <GalleryView categoryTitle={this.state.types[0]} />
                )}
              />
              {this.state.types.map((type) => (
                <Route
                  key={type}
                  exact
                  path={`/${type} /:id`}
                  component={() => <Product2 />}
                />
              ))}
              <Route path="/cart" component={() => <Cart />} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default App;
