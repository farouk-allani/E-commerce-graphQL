import { Link } from "react-router-dom";
import { LinkButton, Tab } from "./NavbarElements";
import logo from "../../images/a-logo.svg";
import emptyCart from "../../images/Empty Cart.svg";
import "./Navbar.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import CartLayerItems from "../Cart/CartLayerItems";
import client from "../../graphQL/gqlClient";
import { gql } from "@apollo/client";
import { changeCurrency, resetCart } from "../../redux/action/index";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      active: '',
      buttonPopup: false,
      loading: false,
      error: null,
      data: [],
      selectedCurrency: this.props.handleCurrency.selectedCurrency,
    };
  }

  static getDerivedStateFromProps(props, state) {
    
    if (state.active === undefined) {
      return {
        ...state,
        active:props.categories[0],
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    client
      .query({
        query: gql`
          query Currencies {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          ...this.state,
          loading: false,
          data: result.data.currencies,
          active: this.props.categories[0]
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err,
        });
      });
  }
  

  handleClickCurrency = (currencySymbol) => {
    this.props.changeCurrency(currencySymbol); // dispatch the action change currency
  };
  handleClickCheckOut = () => {
    alert("I love Scandiweb");
    this.setState({ ...this.state, buttonPopup: false });
    this.props.resetCart();
  };
  handleClickBag = () => {
    this.setState({ ...this.state, buttonPopup: false });
  };
  render() {
    const quantity = this.props.handleCart.reduce((accum, x) => {
      return accum + x.qty;
    }, 0);

    const total =
      this.props.handleCart.length === 0
        ? null
        : this.props.handleCart.map((product) => {
            return (
              product.qty *
              product.prices.filter(
                (price) =>
                  price.currency.symbol ===
                  this.props.handleCurrency.selectedCurrency
              )[0].amount
            );
          });
    const add = (accumulator, a) => {
      return accumulator + a;
    };

    const finalTotal = total === null ? null : total.reduce(add, 0);

    return (
      <div className="sticky">
        <div className="header">
          <div className="navigation">
            <LinkButton>
              {this.props.categories.map((type, index) => (
                <Link
                  className="nav-link"
                  to={`/${type.toLowerCase()}`}
                  key={index}
                >
                  <Tab
                    key={type}
                    active={this.state.active === type}
                    onClick={() =>
                      this.setState({ ...this.state, active: type })
                    }
                  >
                    {type}
                  </Tab>
                </Link>
              ))}
            </LinkButton>
          </div>
          <img src={logo} alt="logo" className="logo" />
          <div className="action">
            <div className="spacer1"></div>
            <div className="spacer2"></div>
            <div className="dropdown"
            onClick={() => {
              this.setState({ ...this.state, buttonPopup: false });
            }}
            >
              <button className="link">
                <div className="currencySelector">
                  
                  <div
                    className="
         triangle_down1"
                  />
                  {this.props.handleCurrency.selectedCurrency}
                </div>
              </button>
              <div className="dropdown-menu">
                <ul>
                  {this.state.data.length &&
                    this.state.data.map((currency, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            this.handleClickCurrency(currency.symbol)
                          }
                        >
                          {currency.symbol} {currency.label}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div
              className="basket"
              onClick={() =>
                this.setState({
                  ...this.state,
                  buttonPopup: !this.state.buttonPopup,
                })
              }
            >
              <img src={emptyCart} alt="emptyCart" className="emptyCart" />

              {this.props.handleCart.length !== 0 && (
                <span className="basket-count"> {quantity} </span>
              )}
            </div>
          </div>
        </div>
        {this.state.buttonPopup === true ? (
          <div
            className="popup"
            onClick={() => {
              this.setState({ ...this.state, buttonPopup: false });
            }}
          />
        ) : null}
        <Popup trigger={this.state.buttonPopup}>
          <p className="myBag">
            My Bag,
            <span>
              {quantity > 1 ? quantity + " items" : quantity + " item"}{" "}
            </span>
          </p>
          {this.props.handleCart.length !== 0 &&
            this.props.handleCart.map((product, index) => {
              return <CartLayerItems key={index} product={product} />;
            })}
          <div className="bagTotal">
            Total
            <span>
              {this.props.handleCurrency.selectedCurrency}
              {Math.round(finalTotal * 100) / 100}
            </span>
          </div>
          <div className="frame13">
            <Link className="bagLink" to="/cart" >
              <button className="viewBag" onClick={this.handleClickBag}>
                VIEW BAG
              </button>
            </Link>
            <button className="checkOut" onClick={this.handleClickCheckOut}>
              CHECK OUT
            </button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  handleCart: state.handleCart,
  handleCurrency: state.handleCurrency,
});

export default connect(mapStateToProps, { changeCurrency, resetCart })(Navbar);
