import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import SNIPPET_ADD from '../../graphql/mutations/add-snippet.mutation';
import SNIPPETS_QUERY from '../../graphql/queries/snippets.query';
import { useInput, useInputArray } from '../../hooks/input';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PillRenderer from '../PillRenderer';

import {
  availableLanguages,
  availableTypes,
  availableVersions
} from '../../languages-config.js';

const useStyles = makeStyles({
  attributes: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > *': {
      margin: '0 20px 0 0'
    },
    '& > div:first-of-type': {
      marginRight: '40px'
    }
  },
  attributeListItem: {
    paddingLeft: '0'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSnippet(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    user: {
      name: username,
      email: useremail,
      picture: userPicture
    } = {},
    filters = []
  } = props;

  let haveUsername = false;
  if (username) { haveUsername = true; }

  const { value:title, bind:bindTitle, reset:resetTitle } = useInput('');
  const { value:author, bind:bindAuthor, reset:resetAuthor } = useInput(username || '');
  const { value:comments, bind:bindComments, reset:resetComments } = useInput('');

  const { values:languages, bind:bindLanguages, reset:resetLanguages } = useInputArray([]);
  const { values:versions, bind:bindVersions, reset:resetVersions } = useInputArray([]);
  const { values:types, bind:bindTypes, reset:resetTypes } = useInputArray([]);

  const { value:code, bind:bindCode, reset:resetCode } = useInput('');
  
  const [addSnippet] = useMutation(
    SNIPPET_ADD, {
      refetchQueries: [{query: SNIPPETS_QUERY, variables: { filters }}],
      awaitRefetchQueries: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitCode = (event) => {
    event.preventDefault();

    addSnippet({ variables: {
      title,
      author,
      code,
      userPicture,
      comments,
      languages,
      versions,
      types
    } });    

    resetTitle();
    resetCode();
    resetComments();
    resetLanguages();
    resetTypes();
    resetVersions();
    setOpen(false);
  };

  return (
    <>
      <ListItem button variant="outlined" color="primary" onClick={handleClickOpen}>
        <ListItemIcon><PostAddIcon color="primary"/></ListItemIcon>
        <ListItemText primary='Add Code' />
      </ListItem>
      <Dialog fullScreen TransitionComponent={Transition} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <DialogTitle className={classes.title} id="form-dialog-title">Add code</DialogTitle>
            <Button autoFocus color="inherit" onClick={submitCode}>
              save
            </Button>
          </Toolbar>
        </AppBar> 
        <DialogContent>
          <form onSubmit={submitCode} noValidate autoComplete="off">

          <List>
            <ListItem padding={0} divider className={classes.attributeListItem}>
              <div className={classes.attributes}>
                <ListItemText primary="Languages" secondary="Select the language(s) of your code" />
                <PillRenderer type="languages" items={availableLanguages} {...bindLanguages} />
              </div>
            </ListItem>
            <ListItem divider className={classes.attributeListItem}>
              <div className={classes.attributes}>
                <ListItemText primary="Type" secondary="Select the Magento Version(s) of your code" />
                <PillRenderer type="versions" items={availableVersions} {...bindVersions} />
              </div>
            </ListItem>
            <ListItem divider className={classes.attributeListItem}>
              <div className={classes.attributes}>
                <ListItemText primary="Magento Version" secondary="Select the types(s) of your code" />
                <PillRenderer type="types" items={availableTypes} {...bindTypes} />
              </div>
            </ListItem>
          </List>

            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                {...bindTitle}
            />
            <TextField
                variant="outlined"
                margin="dense"
                id="author"
                label="Author"
                type="text"
                disabled={haveUsername}
                fullWidth
                {...bindAuthor}
            />
            <TextField
                multiline
                variant="outlined"
                margin="dense"
                id="code"
                rows="10"
                label="Code"
                type="text"
                fullWidth
                {...bindCode}
            />
            <TextField
                multiline
                variant="outlined"
                margin="dense"
                id="comments"
                rows="5"
                label="Comments"
                type="text"
                fullWidth
                {...bindComments}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
