import productCardCss from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import greenCart from "../../images/greenCart.svg";
import { connect } from "react-redux";
import React, { Component } from "react";
import {addCart} from '../../redux/action/index';
import {productByID} from '../../graphQL/queries';
import client from "../../graphQL/gqlClient";

export class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: undefined,
      data: [],
    };
  }

componentDidMount(){
  this.setState({
    loading: true,
  });
  client
    .query({
      query: productByID,
      variables: {
        id: this.props.product.id,
      },
    })
    .then((result) => {
      this.setState({
        ...this.state ,
        loading: false,
        data: result.data,
        
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
  handleDefaultAttr(){
    const pdName=this.state.data.product.name
    let attArray=[];
      this.state.data.product.attributes.forEach((att)=>  {
        const fullAttribute=[{[pdName+' '+att.name]:att.items[0].value}]
        attArray=attArray.concat(fullAttribute)
      })
      const selectedAttr=JSON.parse(JSON.stringify(attArray));
      const productAttr=  JSON.parse(JSON.stringify(this.state.data.product));
      productAttr.selectedAttr=selectedAttr;
      this.props.addCart(productAttr)
  }
  render() {
    const price = this.props.product.prices.filter(
      (thePrice) =>
        thePrice.currency.symbol === this.props.handleCurrency.selectedCurrency
    );
    const product = this.props.product;
    return (
      <div
        key={product.id}
        className={
          product.inStock
            ? productCardCss.productCard
            : productCardCss.productCardOutOfStock
        }
      >
        <Link
          to={`${this.props.category} /${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <img
            className={productCardCss.pic}
            alt="pic"
            src={product.gallery[0]}
          />
          {product.inStock ? null : (
            <div className={productCardCss.outOfStock}>OUT OF STOCK</div>
          )}
          <div className={productCardCss.content}>
            
            <div className={productCardCss.name}> {product.name} </div>
            {/* Product Price */}
            <div className={productCardCss.price}>
              {price[0].currency.symbol}
              {price[0].amount}
            </div>
          </div>
        </Link>
        {product.inStock?
           <img
              onClick={()=>this.handleDefaultAttr()}
              className={productCardCss.greenCart}
              src={greenCart}
              alt="green cart"
            />
            :null
          }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  handleCurrency: state.handleCurrency,
});
export default connect(mapStateToProps,{addCart})(ProductCard);
