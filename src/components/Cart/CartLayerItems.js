import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../../redux/action/index";
import "./CartLayerItems.css";
import ImageSlider2 from "../navBar/ImageSlider2";

export class CartLayerItems extends Component {
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
        <div className="item-box2">
          <div className="item-props2">
            <div className="brand2"> {this.props.product.brand} </div>
            <div className="name2"> {this.props.product.name} </div>
            <div className="price2">
              {this.state.price[0].currency.symbol}
              {this.state.price[0].amount}
            </div>

            <div className="attributes2">
              {this.props.product.attributes && this.props.product.attributes.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="attName2">{item.name.toUpperCase()}:</div>
                    <ul>
                      {item.items.map((attribute, index) => (
                        <li
                        className={
                          
                            this.props.product.selectedAttr.findIndex(el=>el[
                              this.props.product.name + " " + item.name
                            ]===attribute.value) !==-1
                                
                                ? 'selected2' 
                                :'notSelected2'     
                        }
                          key={index}
                        >
                          <button
                            className={
                              item.type === "text"
                                ? "attrBtn2"
                                : "ColorAttrBtn2"
                            }
                            style={{backgroundColor: attribute.value}}
                          >
                          <button className={
                            item.type === "swatch" &&
                            this.props.product.selectedAttr.findIndex(el=>el[
                              this.props.product.name + " " + item.name
                            ]===attribute.value) !==-1
                              ? "swatchSelected2"
                              : "swatchnotSelected2"
                          } >
                         
                         </button>
                          {item.type === "text" && attribute.value}

                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {/* End Displaying attributes */}
            </div>
          </div>
          <div className="item-pic2">
            <div className="inc-dec2">
              <button className="btn2" onClick={this.handleIncrement}>
                +
              </button>
              <div className="qty2"> {this.props.product.qty} </div>
              <button className="btn2" onClick={this.handleDecrement}>
                -
              </button>
            </div>

            <div className="side-pic-cart2">
              <ImageSlider2 slides={this.props.product.gallery} />
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

export default connect(mapStateToProps, { increment, decrement })(
  CartLayerItems
);
