import React, { Component } from "react";
import toTheRight from "../../images/toTheRight.svg";
import toTheLeft from "../../images//toTheLeft.svg";
import "./ImageSlider2.css";

export class ImageSlider2 extends Component {
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
    console.log("current:", this.state.current);
    return (
      <section className="slider2">
        {this.props.slides.map((slide, index) => {
          return (
            <div
              className={
                index === this.state.current ? "slide2 active" : "slide2"
              }
              key={index}
            >
              {index === this.state.current && (
                <img src={slide} alt="Product pic" className="image2" />
              )}
            </div>
          );
        })}
        {this.state.length > 1 && (
          <>
            <img
              src={toTheLeft}
              alt="left button"
              className="right-arrow2"
              onClick={this.nextSlide}
            />
            <img
              src={toTheRight}
              alt="right button"
              className="left-arrow2"
              onClick={this.prevSlide}
            />
          </>
        )}
      </section>
    );
  }
}

export default ImageSlider2;
