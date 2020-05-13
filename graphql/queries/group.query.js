import gql from 'graphql-tag';

const GROUP_QUERY = gql`
  query Group($id: String!) {
    getGroup(id: $id) {
        groupTitle
        snippets
        _id
    }
  }
`;

export default GROUP_QUERY;