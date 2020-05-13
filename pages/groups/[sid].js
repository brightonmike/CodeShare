import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import GROUP_QUERY from '../../graphql/queries/group.query';
import Group from '../../components/Group';

const GroupPage = () => {
  const router = useRouter();
  const { sid } = router.query;
   const { data: { getGroup = {} } = {}, loading, error } = useQuery(GROUP_QUERY, {
     variables: { id: sid },
   });

  return (
    <div>
      <Head>
        <title>Snippet | Gene Code Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Group group={getGroup} />
    </div>
  );
};

export default GroupPage;