import Head from 'next/head';
import React from 'react';
import { withAuth } from 'use-auth0-hooks';
import { useAuth } from 'use-auth0-hooks';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Link from '../Link';

import AddSnippet from '../AddSnippet';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  snippetHeader: {
    display: 'flex',
    marginBottom: '20px',
  },
  snippetAvatar: {
    marginRight: '20px'
  },
  logout: {
    marginRight: '20px'
  },
  attributes: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 10px 10px 0'
    },
  }
}));

const AppShell = (props) => {
  const { auth = {} } = props;
  const { user } = auth;
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();
  
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          text: {
            primary: '#1d262f',
            secondary: '#1d262f'
          },
          primary: {
           main: '#1d262f',
          },
          secondary: {
           main: '#bb86fc',
          },
          error: {
            main: '#f44336'
          },
          warning: {
           main: '#ff9800',
          },
        },
      })
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {isAuthenticated && 
          <>
            <AppBar elevation={1} position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                  Gene Code Share
                </Typography>

                <Button className={classes.logout} onClick={() => logout({ returnTo: 'http://localhost:3000' })}>Log out</Button>
                <Button onClick={() => toggleDarkMode()}><Brightness4Icon /></Button>
                {user && <Avatar src={user.picture} />}
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
            >
              <div className={classes.toolbar} />
              <Divider />          
              <List>            
                <AddSnippet user={user} />
                {[
                  { label: 'All Code', uri: '/' },
                  { label: 'Backend', uri: '/backend' },
                  { label: 'Frontend', uri: '/frontend' },
                  { label: 'CLI', uri: '/cli' },
                ].map((link, index) => (
                  <Link href={link.uri} key={link.label}>
                    <ListItem button>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon color="primary" /> : <MailIcon color="primary"/>}</ListItemIcon>
                      <ListItemText primary={link.label} />
                    </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
              <List>
                {['Users', 'Archive'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon color="primary"/> : <MailIcon color="primary"/>}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
          }
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.content}
          </main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default withAuth(AppShell);