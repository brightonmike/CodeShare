import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { Auth0Provider } from 'use-auth0-hooks';
import AppShell from '../components/AppShell';
import '../styles/global.css';

import withData from '../graphql/apollo-client';

function MyApp({ Component, pageProps, apollo }) {
  return (
      <ApolloProvider client={apollo}>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          client_id={process.env.AUTH0_CLIENT_ID}
          redirect_uri={process.env.AUTH0_REDIRECT}>
            <AppShell content={<Component {...pageProps} />} />
        </Auth0Provider>
      </ApolloProvider>
  )
}

export default withData(MyApp);