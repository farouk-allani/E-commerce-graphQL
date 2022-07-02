import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.css";
import CartItems from "./CartItems";

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  

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
                  this.props.handleCurrency
              )[0].amount
            );
          });
    const add = (accumulator, a) => {
      return accumulator + a;
    };

    const finalTotal = total === null ? null : total.reduce(add, 0);

    return (
      <div>
        <div className="Cart">CART</div>
        {this.props.handleCart.length === 0 && (
          <div className="Cart"> The Cart is Empty</div>
        )}
        {this.props.handleCart.length !== 0 &&
          this.props.handleCart.map((product, index) => {
            return <CartItems key={index} product={product} />;
          })}
        <div className="tax-total">
          <div className="tax">
            Tax 21%:{this.props.handleCurrency}
            {Math.round(((finalTotal * 100) / 100 / 100) * 21)}
          </div>
          <div className="qty">Quantity: {quantity} </div>
          <div className="total">
            Total: {this.props.handleCurrency}
            {Math.round(finalTotal * 100) / 100}
          </div>
          <button className="order">ORDER</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  handleCart: state.handleCart,
  handleCurrency: state.handleCurrency.selectedCurrency,
});

export default connect(mapStateToProps, null)(Cart);
