import gql from 'graphql-tag';

const SNIPPETS_QUERY = gql`
  query Snippets {
    getSnippets {
        title
        author
        userPicture
        languages
        code
        versions
        types
        _id
    }
  }
`;

export default SNIPPETS_QUERY;