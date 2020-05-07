import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Snippets from '../components/Snippets';

import { useAuth } from 'use-auth0-hooks';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: `100vh`
  },
  login: {
    flexBasis: '100%',
    maxWidth: '500px',
    textAlign: 'center',
    padding: '30px 0'
  },
  logo: {
    display: 'block',
    backgroundColor: 'black',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '0 auto',
    padding: '20px'
  },
  logoImg: {
    width: '100%'
  }
}));

const Home = (props) => {
  const { setFilter = () => {}, filters = [], snippets, loading } = props;
  const classes = useStyles();
  const { pathname, query } = useRouter();
  const { isAuthenticated, login } = useAuth();

  return (
    <div>
      <Head>
        <title>Home | Gene Code Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthenticated && <Snippets loading={loading} snippets={snippets} setFilter={setFilter} filters={filters}/>}
      {!isAuthenticated &&
        <div className={classes.root}>
          <main className={classes.content}>
            <CssBaseline />
            <Card className={classes.login}>
              <div className={classes.logo}>
                <img className={classes.logoImg} src="./logo.png" />
              </div>
              <h1>Login</h1>
              <p>You will need to login with a Gene Google Account.</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => login({ appState: { returnTo: { pathname, query } } })}>
                  Log in
              </Button>
            </Card>
          </main>
        </div>
      }
    </div>
  );
};

export default Home;