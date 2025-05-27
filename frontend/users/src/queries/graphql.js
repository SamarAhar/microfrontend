import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Get {
    getAllUser {
      id
      name
      phoneNo
      email
      address
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      id
      name
      phoneNo
      email
      address
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
      name
      phoneNo
      email
      address
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
