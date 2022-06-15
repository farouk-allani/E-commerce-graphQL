import "./App.css";
import client from "./views/gqlClient";
import {navigationQuery} from './graphQL/queries'
import Navbar from "./components/navBar/Navbar";
import GalleryView from "./views/GalleryView";
import Product2 from "./views/GalleryView/Product";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Cart from "./components/Cart/Cart";

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       types:[]
    }
  }
   componentDidMount(){
     client.query({
      query:navigationQuery,
    })
    .then( (result)=>{
      this.setState({types:result.data.categories.map((cat)=> cat.name)})
      console.log('gqlgqglqg err',result)
    } )
    .catch( (err)=>console.log('gqlgqglqg err',err) )
  }

  render() {
    return (
      <div className="app">
        <Navbar categories={this.state.types} />
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
