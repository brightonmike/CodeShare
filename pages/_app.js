import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { Auth0Provider } from 'use-auth0-hooks';

import AppShell from '../components/AppShell';
import '../styles/global.css';

import withData from '../graphql/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    console.log(process.env);

    return (
      <ApolloProvider client={apollo}>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          client_id={process.env.AUTH0_CLIENT_ID}
          redirect_uri={process.env.AUTH0_REDIRECT}>
            <AppShell content={<Component {...pageProps} />} />
        </Auth0Provider>
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);