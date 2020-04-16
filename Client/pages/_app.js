import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { Auth0Provider } from 'use-auth0-hooks';
import config from "../auth_config.json";

import AppShell from '../components/AppShell';
import '../styles/global.css';

import withData from '../graphql/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Auth0Provider
          domain={config.domain}
          client_id={config.clientId}
          redirect_uri={config.redirect}>
            <AppShell content={<Component {...pageProps} />} />
        </Auth0Provider>
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);