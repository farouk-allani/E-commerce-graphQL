import React from "react";
import client from "../../graphQL/gqlClient";
import {productByID} from '../../graphQL/queries'
import "./Product.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addCart } from "../../redux/action/index";
import { setAttribute } from "../../redux/action/index";
import parse from "html-react-parser";



class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttr: [],
      loading: false,
      error: undefined,
      data: undefined,
      price: [],
      id: this.props.match.params.id,
    };
  }

checkAttrExist=(prodName,itemName,attrValue,selectedAttr) =>{
    const found = selectedAttr.find(element => element[prodName+' '+itemName] !== undefined);
    const fullAttribute={[prodName + " " + itemName]:attrValue}
    if (found===undefined) {
    this.setState({...this.state, selectedAttr:this.state.selectedAttr.concat([fullAttribute])})
    }
    else {
      const found2=selectedAttr.find(element => element === fullAttribute)
      if (found2===undefined) {
        
        const index = selectedAttr.findIndex((el) => el[prodName+' '+itemName] !== undefined)   
        if (index!==-1){
        const attrArray=this.state.selectedAttr
        attrArray[index]=fullAttribute
        this.setState({...this.state, selectedAttr:attrArray})
        }
      }
    }
    
  }

  handleAddToCart = () => {
    // dispatch action to add a product to cart
    const selectedAttr=JSON.parse(JSON.stringify(this.state.selectedAttr));  
    const productAttr=  JSON.parse(JSON.stringify(this.state.data.product));  
    
    productAttr.selectedAttr=selectedAttr;
    // const productAttr= Object.assign(selectedAttr,this.state.data.product);
    // console.log('selectedAttr:',selectedAttr)
    if (this.state.data.product.attributes.length === selectedAttr.length){
      this.props.addCart(productAttr);
    }
    else { alert('Select Attributes First.') }
    // this.setState({...this.state,selectedAttr: []})
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    client
      .query({
        query: productByID,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => {
        this.setState({
          ...this.state ,
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
    console.log('selectedAttr:',this.state.selectedAttr)
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
                        className={
                          attribute.value ===
                                this.props.handleAttributes[
                                  this.state.data.product.name + " " + item.name
                                ]
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
                            onClick={() =>{
                              setAttribute(
                                this.state.data.product.name,
                                attribute.value,
                                item.name
                              )
                              // const newStateArray = this.state.myArray;
                              // newStateArray.push();
                          
                              // this.setState({
                              //   ...this.state,
                              //   selectedAttr: [...this.state.selectedAttr, attribute.value]
                              // })
                              this.checkAttrExist(this.state.data.product.name,item.name,attribute.value,this.state.selectedAttr)


                            
                            }
                            }
                          >
                          <button className={
                            item.type === "swatch" &&
                            attribute.value ===
                              this.props.handleAttributes[
                                this.state.data.product.name + " " + item.name
                              ]
                              ? "swatchSelected"
                              : "swatchnotSelected"
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
