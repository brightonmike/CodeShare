import gql from 'graphql-tag';

const GROUP_ADD = gql`
  mutation AddGroup(
    $title: String!,
    $snippets: [String]
    ){
    addGroup(
        group: {
          groupTitle: $title,
          snippets: $snippets
        }
    ){
      success,
      message,
      groupTitle,
      snippets,
      _id
    }
  }
`;

export default GROUP_ADD;