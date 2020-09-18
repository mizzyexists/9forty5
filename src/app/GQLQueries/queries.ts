import gql from 'graphql-tag';

export const GetPostsGenQuery = gql`
    query GetPosts {
      posts(order_by: {id: asc}) {
        id
        title
        content
      }
    }
`;

export const GetUsersGenQuery = gql`
    query GetUsers {
      users(order_by: {id: asc}) {
        id
        username
        bio
      }
    }
`;
