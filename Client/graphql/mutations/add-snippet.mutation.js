import gql from 'graphql-tag';

const SNIPPET_ADD = gql`
  mutation AddSnippet(
    $title: String!,
    $author: String!,
    $userPicture: String,
    $languages: [String],
    $code: String!,
    $comments: String,
    $versions: [String],
    $types: [String]
    ){
    addSnippet(
        snippet: {
          title: $title,
          author: $author,
          userPicture: $userPicture,
          languages: $languages,
          code: $code,
          comments: $comments,
          versions: $versions,
          types: $types
        }
    ){
      success
      message
      title
      author
      userPicture
      languages
      code
      comments
      versions
      types
      _id
    }
  }
`;

export default SNIPPET_ADD;