import productCardCss from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import greenCart from "../../images/greenCart.svg";
import { connect } from "react-redux";
import React, { Component } from "react";
import {addCart} from '../../redux/action/index';

export class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }
  handleDefaultAttr(){
    const pdName=this.props.product.name
    console.log(this.props.product)
    let attArray=[];
      this.props.product.attributes.forEach((att)=>  {
        const fullAttribute=[{[pdName+' '+att.name]:att.items[0].value}]
        attArray=attArray.concat(fullAttribute)
      })
      const selectedAttr=JSON.parse(JSON.stringify(attArray));
      const productAttr=  JSON.parse(JSON.stringify(this.props.product));
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
