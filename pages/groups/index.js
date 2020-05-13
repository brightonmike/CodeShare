import Head from 'next/head';
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import GROUPS_QUERY from '../../graphql/queries/groups.query';
import Groups from '../../components/Groups';

const GroupsPage = () => {
   const { data: { getGroups = [] } = {}, loading, error } = useQuery(GROUPS_QUERY);

  return (
    <div>
      <Head>
        <title>Snippet | Gene Code Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Groups groups={getGroups}/>
    </div>
  );
};

export default GroupsPage;