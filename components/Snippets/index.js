import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import GROUP_ADD from '../../graphql/mutations/add-group.mutation';
import GROUPS_QUERY from '../../graphql/queries/groups.query';

import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../../hooks/input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Link from '../Link';

import {
  availableLanguages
} from '../../languages-config.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 400
  },
  filters: {
    width: '100%',
    background: 'none',
    justifyContent: 'flex-start'
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
  filterListClass: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  filterListItemClass: {
    width: 'auto',
    paddingLeft: '0'
  },
  attributes: {
    display: 'flex',
    flexWrap: 'wrap',
    borderBottom: '1px solid',
    borderBottomColor: '#e0e0e0',
    paddingTop: '10px',
    '& > *': {
      margin: '0 10px 10px 0'
    },
  },
  finishGroup: {
    margin: '0 auto',
    padding: '15px 30px',
    maxWidth: '900px'
  },
  finishGroupButton: {
    width: '100%',
    margin: '10px'
  }
});

const Snippets = (props) => {
  const classes = useStyles();
  const { setFilter = () => {}, filters = [], snippets, loading } = props;

  const [addGroup] = useMutation(
    GROUP_ADD, {
      refetchQueries: [{query: GROUPS_QUERY }],
      awaitRefetchQueries: true,
  });

  const [group, createGroup] = React.useState(false);
  const { value:groupTitle, bind:bindGroupTitle, reset:resetGroupTitle } = useInput('');
  const [groupSnippets, setGroupSnippets] = React.useState([]);

  const isActive = filter => {
    return filters.includes(filter) ? 'secondary' : 'default';
  };

  const languageFilterList = [];
  for (const value of availableLanguages) {
    languageFilterList.push(<ListItem className={classes.filterListItemClass} padding={0} margin={10}><Chip
      avatar={<Avatar>{value.charAt(0)}</Avatar>}
      label={value}
      key={`${value}-filter`}
      clickable
      color={isActive(value)}
      onClick={() => { setFilter(value) }}
    /></ListItem>)
  }

  const startGroup = snippetId => {
    createGroup(true);
    setGroupSnippets([...groupSnippets, ...[snippetId]]);
  }

  const cancelGroup = () => {
    createGroup(false);
    resetGroupTitle();
    setGroupSnippets([]);
  }

  const addToGroup = snippetId => {
    setGroupSnippets([...groupSnippets, ...[snippetId]]);
  }

  const inGroup = snippetId => {
    return groupSnippets.includes(snippetId);
  }

  const finishGroup = () => {
    addGroup({ variables: {
      title: groupTitle,
      snippets: groupSnippets
    } });  

    cancelGroup();
  }

  if (loading) {
    return (
      <p>Loading..</p>  
    );
  }

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <List className={classes.filterListClass}>
            {languageFilterList}
        </List>
      </Grid>

      {snippets && snippets.map(snippet => {
          return <Grid item xs={12} sm={6} md={3} key={`snippet__${snippet._id}`}>
            <Card className={inGroup(snippet._id) ? 'snippet in-group' : 'snippet'} width={286}>
                <CardContent>
                  <div className={classes.snippetHeader}>
                    <Avatar className={classes.snippetAvatar} src={snippet.userPicture}></Avatar>
                    <div>
                      <Typography variant="h6" component="h2">{snippet.title}</Typography>
                      <Typography variant="subtitle2">{snippet.author}</Typography>
                    </div>
                  </div>

                  <div className={classes.attributes}>
                    {snippet.languages &&
                      snippet.languages.map(language => {
                        return <Chip
                          size="small"
                          avatar={<Avatar>{language.charAt(0)}</Avatar>}
                          label={language}
                          key={`${snippet._id}-${language}`}
                          color="secondary"
                        />
                      })
                    }
                    {snippet.types &&
                      snippet.types.map(type => {
                        return <Chip
                          size="small"
                          avatar={<Avatar>{type.charAt(0) + type.charAt(1)}</Avatar>}
                          label={type}
                          key={`${snippet._id}-${type}`}
                        />
                      })
                    }
                  </div>
                </CardContent>
                <CardActions>
                  <Button variant="contained">
                    <Link href="/snippet/[sid]" as={`/snippet/${snippet._id}`}>View Code</Link>
                  </Button>
                  {!group && 
                    <Button variant="contained" color="primary" onClick={() => {startGroup(snippet._id)}}>
                      Create Group
                    </Button>
                  }
                  {group && !inGroup(snippet._id) &&
                    <Button variant="contained" color="primary" onClick={() => {addToGroup(snippet._id)}}>
                      Add to Group
                    </Button>
                  }
                </CardActions>
            </Card>
          </Grid>;
        })}
        <Drawer  variant="persistent" anchor='bottom' open={group} onClose={() => { cancelGroup() }}>
          <Grid container className={classes.finishGroup}>
            <Grid item xs={12} md={10}>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                {...bindGroupTitle}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button  className={classes.finishGroupButton} variant="contained" color="primary" onClick={() => {finishGroup()}}>
                Finish Group
              </Button>
            </Grid>
          </Grid>
        </Drawer>
    </Grid>
  );
};

export default Snippets;
