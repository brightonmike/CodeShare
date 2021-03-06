import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import SNIPPET_QUERY from '../../graphql/queries/snippet.query';

import Grid from '@material-ui/core/Grid';
import Snippet from '../../components/Snippet';

const SnippetPage = () => {
  const router = useRouter();
  const { sid } = router.query;
   const { data: { getSnippet = {} } = {}, loading, error } = useQuery(SNIPPET_QUERY, {
     variables: { id: sid },
   });

  return (
    <div>
      <Head>
        <title>Snippet | Gene Code Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3}>
        <Snippet snippet={getSnippet}/>
      </Grid>
    </div>
  );
};

export default SnippetPage;