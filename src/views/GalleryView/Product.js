import React from "react";
import client from "../gqlClient";
import { loader } from "graphql.macro";
import "./Product.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addCart } from "../../redux/action/index";
import { setAttribute } from "../../redux/action/index";
import parse from "html-react-parser";

const ProductQuery = loader("./ProductQuery.gql");

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: undefined,
      data: undefined,
      price: [],
      id: this.props.match.params.id,
    };
  }

  handleAddToCart = () => {
    // dispatch action to add a product to cart
    this.props.addCart(this.state.data.product);
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    client
      .query({
        query: ProductQuery,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => {
        this.setState({
          loading: false,
          data: result.data,
          selectedImg: result.data.product.gallery[0],
          price: result.data.product.prices.filter(
            (price) =>
              price.currency.symbol ===
              this.props.handleCurrency.selectedCurrency
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: err,
        });
      });
  }
  render() {
    const { setAttribute } = this.props;

    if (this.state.loading) {
      return "loading";
    } else if (this.state.data) {
      return (
        <div>
          <div className="container">
            <div className="side-pics">
              {this.state.data.product.gallery.map((pic, index) => {
                return (
                  <img
                    className="side-pic"
                    src={pic}
                    alt="pic1"
                    key={index}
                    onClick={() =>
                      this.setState({ ...this.state, selectedImg: pic })
                    }
                  />
                );
              })}
            </div>
            <div className="group625">
              <img
                className="big-pic"
                src={this.state.selectedImg}
                alt="Big-Pic"
              />
              <div className="group624">
                <div className="BrandName">
                  {this.state.data.product.brand}
                </div>
                <div className="pName"> {this.state.data.product.name} </div>
                <div className="attributes">
                  {/* listing Product attributes */}
                  {this.state.data.product.attributes !== 0 &&
                    this.state.data.product.attributes.map((item) => {
                      return (
                        <div key={item.name}>
                          <div className="attName">
                            {item.name.toUpperCase()}:
                          </div>
                          <ul>
                            {item.items.map((attribute, index) => (
                              <li
                                key={index}
                                style={{ backgroundColor: attribute.value }}
                              >
                                <button
                                  onClick={() =>
                                    setAttribute(
                                      this.state.data.product.name,
                                      attribute.value,
                                      item.name
                                    )
                                  }
                                  className={
                                    item.type === "text"
                                      ? "attrBtn"
                                      : "ColorAttrBtn"
                                  }
                                  style={{
                                    border:
                                      item.type === "swatch" &&
                                      attribute.value ===
                                        this.props.handleAttributes[
                                          this.state.data.product.name +
                                            " " +
                                            item.name
                                        ]
                                        ? "4px solid #21933f"
                                        : null,
                                    color:
                                      attribute.value ===
                                      this.props.handleAttributes[
                                        this.state.data.product.name +
                                          " " +
                                          item.name
                                      ]
                                        ? "white"
                                        : "black",

                                    backgroundColor:
                                      attribute.value ===
                                        this.props.handleAttributes[
                                          this.state.data.product.name +
                                            " " +
                                            item.name
                                        ] &&
                                      this.props.handleAttributes.hasOwnProperty(
                                        `${
                                          this.state.data.product.name +
                                          " " +
                                          item.name
                                        }`
                                      ) &&
                                      item.type === "text"
                                        ? "black"
                                        : "transparent",
                                  }}
                                >
                                  {item.type === "swatch"
                                    ? null
                                    : attribute.value}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  {/* End listing Product attributes */}
                </div>

                <div className="price">PRICE:</div>
                <div className="price-value">
                  {this.state.price[0].currency.symbol}
                  {this.state.price[0].amount}
                </div>

                {this.state.data.product.inStock ? (
                  <button
                    onClick={this.handleAddToCart}
                    className="add-to-cart"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button className="out-of-stock">OUT OF STOCK</button>
                )}
                <div className="description">
                  {parse(`${this.state.data.product.description}`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return JSON.stringify(this.state.error);
    }
  }
}
const mapStateToProps = (state) => ({
  handleCart: state.handleCart,
  handleCurrency: state.handleCurrency,
  handleAttributes: state.handleAttributes,
});

export default connect(mapStateToProps, { addCart, setAttribute })(
  withRouter(Product)
);
