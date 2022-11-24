import { gql } from "apollo-server";

const schema1 = gql`
  type User {
    name: String
  }

  type Query {
    getUser: User
  }
`;

export default schema1;
