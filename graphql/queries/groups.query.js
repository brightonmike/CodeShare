import gql from 'graphql-tag';

const GROUPS_QUERY = gql`
  query Groups {
    getGroups {
        groupTitle
        snippets
        _id
    }
  }
`;

export default GROUPS_QUERY;