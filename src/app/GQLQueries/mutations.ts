import gql from 'graphql-tag';

export const ChangeUserBioMutation = gql`
mutation ChangeUserBio ($id: Int!, $bio: String!) {
  update_users(where: {id: {_eq: $id}}, _set: {bio: $bio}) {
    returning {
      id
      bio
    }
  }
}
`;

export const CreateNewUserMutation = gql`
mutation CreateNewUser ($uname: String!, $bio: String!){
  insert_users(objects: {username: $uname, bio: $bio}) {
    returning {
      id
      username
      bio
    }
  }
}
`;

export const DeleteUserMutation = gql`
mutation DeleteUser($id: Int!) {
  delete_users(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
`;
