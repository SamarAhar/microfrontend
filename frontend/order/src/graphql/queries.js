import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getAllUser {
      id
      name
      
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct {
    getAllProduct {
      id
      productName
    
    }
  }
`;