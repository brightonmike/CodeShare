import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useQuery } from '@apollo/react-hooks';
import SNIPPET_QUERY from '../../graphql/queries/snippet.query';
import Snippet from '../../components/Snippet';

const SnippetDisplay = snippet => {
  const {snippetId = '' } = snippet;
  const { data: { getSnippet = {} } = {}, loading, error } = useQuery(SNIPPET_QUERY, {
    variables: { id: snippetId },
  });

  return (
    <>
      <Grid item xs={12} sm={6} md={3} key={`snippet__${getSnippet._id}`}>
        <Snippet snippet={getSnippet}/>
      </Grid>
    </>
  );
};

const Group = (props) => {
  const { group = {}, loading } = props;

  if (loading) {
    return (
      <p>Loading..</p>  
    );
  }


  return (
    <>
      <Grid container spacing={3}>
        <Typography variant="h6" component="h2">{group.groupTitle}</Typography>
      </Grid>
      <Grid container spacing={3}>
        {group.snippets && group.snippets.map(snippet => <SnippetDisplay snippetId={snippet} />)}
      </Grid>
    </>
  );
};

export default Group;
