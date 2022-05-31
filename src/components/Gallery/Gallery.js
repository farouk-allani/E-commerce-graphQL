import { ProductCard } from "../ProductCard";
import galleryCss from "./Gallery.module.scss";
import React, { Component } from "react";

class Gallery extends Component {
  render() {
    return (
      <div className={galleryCss.gallery}>
        <div className={galleryCss.categoryTitle}>
          {this.props.category.toUpperCase()}
        </div>
        <div className={galleryCss.cardsContainer}>
          {this.props.products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              category={this.props.category}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
