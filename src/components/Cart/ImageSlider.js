import React, { Component } from "react";
import toTheRight from "../../images/toTheRight.svg";
import toTheLeft from "../../images/toTheLeft.svg";
import "./ImageSlider.css";

export class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      length: this.props.slides.length,
    };
  }

  nextSlide = () => {
    this.state.current === this.state.length - 1
      ? this.setState({ ...this.state, current: 0 })
      : this.setState({ ...this.state, current: this.state.current + 1 });
  };

  prevSlide = () => {
    this.state.current === 0
      ? this.setState({ ...this.state, current: this.state.length - 1 })
      : this.setState({ ...this.state, current: this.state.current - 1 });
  };

  render() {
    return (
      <section className="slider">
        {this.props.slides.map((slide, index) => {
          return (
            <div
              className={
                index === this.state.current ? "slide active" : "slide"
              }
              key={index}
            >
              {index === this.state.current && (
                <img src={slide} alt="Product pic" className="image" />
              )}
            </div>
          );
        })}
        {this.state.length > 1 && (
          <>
            {" "}
            <img
              src={toTheLeft}
              alt="left button"
              className="right-arrow"
              onClick={this.nextSlide}
            />
            <img
              src={toTheRight}
              alt="right button"
              className="left-arrow"
              onClick={this.prevSlide}
            />
          </>
        )}
      </section>
    );
  }
}

export default ImageSlider;
