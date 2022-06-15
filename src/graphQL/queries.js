import { gql } from "@apollo/client";


export const productByID = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      brand
    }
  }
`;

export const navigationQuery = gql`
  query {
    categories {
      name
    }
  }
`;

