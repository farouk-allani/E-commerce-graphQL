import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../../redux/action/index";
import "./CartItems.css";
import ImageSlider from "./ImageSlider";

export class CartItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.props.product.prices.filter(
        (price) =>
          price.currency.symbol === this.props.handleCurrency.selectedCurrency
      ),
    };
  }

  handleIncrement = () => {
    this.props.increment(this.props.product);
  };
  handleDecrement = () => {
    this.props.decrement(this.props.product);
  };
  render() {
    return (
      <div>
        <div className="item-box">
          <div className="item-props">
            <div className="brand"> {this.props.product.brand} </div>
            <div className="name"> {this.props.product.name} </div>
            <div className="price">
              {this.state.price[0].currency.symbol}
              {this.state.price[0].amount}
            </div>

            <div className="attributes">
              {/* listing Product attributes */}
              {this.props.product.attributes !== 0 &&
                this.props.product.attributes.map((item) => {
                  return (
                    <div key={item.name}>
                      <div className="attNameCart">
                        {item.name.toUpperCase()}:
                      </div>
                      <ul>
                      {item.items.map((attribute, index) => (
                        <li
                        className={
                          this.props.product.selectedAttr.findIndex(el=>el[
                            this.props.product.name + " " + item.name
                          ]===attribute.value) !==-1
                                ? 'selected' 
                                :'notSelected'     
                        }
                          key={index}
                        >
                          <button
                            className={
                              item.type === "text"
                                ? "attrBtn"
                                : "ColorAttrBtn"
                            }
                            style={{backgroundColor: attribute.value}}
                          >
                          <div className={
                           item.type === "swatch" &&
                           this.props.product.selectedAttr.findIndex(el=>el[
                             this.props.product.name + " " + item.name
                           ]===attribute.value) !==-1
                              ? "swatchSelected"
                              : "swatchnotSelected"
                          } >
                         
                         </div>
                          {item.type === "text" && attribute.value}

                          </button>
                        </li>
                      ))}
                      </ul>
                    </div>
                  );
                })}
              {/* End listing Product attributes */}
            </div>
          </div>
          <div className="item-pic">
            <div className="inc-dec">
              <button className="btn" onClick={this.handleIncrement}>
                +
              </button>
              <div className="qty"> {this.props.product.qty} </div>
              <button className="btn" onClick={this.handleDecrement}>
                -
              </button>
            </div>

            <div className="side-pic-cart">
              <ImageSlider slides={this.props.product.gallery} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  handleCart: state.handleCart,
  handleAttributes: state.handleAttributes,
  handleCurrency: state.handleCurrency,
});

export default connect(mapStateToProps, { increment, decrement })(CartItems);
