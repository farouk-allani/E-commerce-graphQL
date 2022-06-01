import React from "react";
import { loader } from "graphql.macro";
import client from "../gqlClient";
import { Gallery } from "../../components/Gallery";


const categoryByTitleQuery = loader("./CategoryByTitleQuery.gql");

class GalleryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, error: undefined, data: undefined };
  }
  componentDidMount() {
   
    this.setState({
      loading: true,
    });
    client
      .query({
        query: categoryByTitleQuery,
        variables: {
          categoryInput: {
            title: this.props.categoryTitle,
          },
        },
      })
      .then((result) => { 
        this.setState({
          loading: false,
          data: result.data,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err,
        });
      });
  }
  render() {
    if (this.state.loading) {
      return "loading";
    } else if (this.state.data && this.state.data.category) {
      return (
        <Gallery
          products={this.state.data.category.products}
          category={this.state.data.category.name}
        />
      );
    } else if (this.state.error) {
      return JSON.stringify(this.state.error);
    }
  }
}
export default GalleryView ;
