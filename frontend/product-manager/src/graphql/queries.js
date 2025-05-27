import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProduct {
      id
      productName
      category
      price
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory {
    getAllProduct {
      category
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation AddProduct($product: ProductInput!) {
    addProduct(productInput: $product) {
      id
      productName
      category
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($product: ProductInput!) {
    updateProduct(product: $product) {
      id
      productName
      category
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;