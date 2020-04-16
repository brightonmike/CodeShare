import gql from 'graphql-tag';

const SNIPPETS_QUERY = gql`
  query Snippet($id: String!) {
    getSnippet(id: $id) {
        title
        author
        userPicture
        languages
        code
        versions
        types
        comments
        _id
    }
  }
`;

export default SNIPPETS_QUERY;