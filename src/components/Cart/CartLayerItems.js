import React, { Component } from "react";
import { Size, LinkButton2 } from "../navBar/NavbarElements";
import { connect } from "react-redux";
import { increment, decrement } from "../../redux/action/index";
import "./CartLayerItems.css";
import ImageSlider2 from "../navBar/ImageSlider2";

export class CartLayerItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      activeSize: "",
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

  componentDidMount() {
    console.log("showinnn props", this.props);
    // Check if the product has attributes
    if (this.props.product.attributes.length === 0) {
      this.setState({
        sizes: [],
      });
    } else {
      // Put attributes in an array named sizes in case they exist
      this.setState({
        sizes: this.props.product.attributes[0].items.map(
          (item) => item.displayValue
        ),
      });
    }
  }

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
              {/* { this.props.product.attributes.length=== 0 ? null: this.props.product.attributes[0].name.toUpperCase()+':'} </div>
              <div className='size-boxes2'> */}
              {/* Displaying attributes */}
              {/* <LinkButton2>
        {this.state.sizes && this.state.sizes.map(size => (
          <Size
            key={size}
            activeSize={this.state.activeSize === size}
             onClick={() => this.setState({...this.state, activeSize: size})}
          >
          {size} 
          </Size>
        ))} 
          </LinkButton2> */}

              {this.props.product.attributes.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="attName2">{item.name.toUpperCase()}:</div>
                    <ul>
                      {item.items.map((attribute, index) => (
                        <li
                          key={index}
                          style={{ backgroundColor: attribute.value }}
                        >
                          <button
                            className={
                              item.type === "text"
                                ? "attrBtn2"
                                : "ColorAttrBtn2"
                            }
                            style={{
                              border:
                                item.type === "swatch" &&
                                attribute.value ===
                                  this.props.handleAttributes[
                                    this.props.product.name + " " + item.name
                                  ]
                                  ? "3px solid #5ECE7B"
                                  : null,
                              color:
                                attribute.value ===
                                this.props.handleAttributes[
                                  this.props.product.name + " " + item.name
                                ]
                                  ? "white"
                                  : "black",

                              backgroundColor:
                                attribute.value ===
                                  this.props.handleAttributes[
                                    this.props.product.name + " " + item.name
                                  ] &&
                                this.props.handleAttributes.hasOwnProperty(
                                  `${this.props.product.name + " " + item.name}`
                                ) &&
                                item.type === "text"
                                  ? "black"
                                  : "transparent",
                            }}
                          >
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