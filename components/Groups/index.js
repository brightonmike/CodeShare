import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Link from '../Link';

import {
  availableLanguages,
  availableTypes,
  availableVersions
} from '../../languages-config.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  filters: {
    width: '100%',
    background: 'none',
    justifyContent: 'flex-start'
  },
  media: {
    height: 140,
  },
  groupsHeader: {
    display: 'flex',
    marginBottom: '20px',
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
  groupSnippetListItem: {
    padding: '0'
  },
  snippetTitle: {
    fontWeight: 'normal'
  },
  snippetAvatar: {
    margin: '0 10px',
    width: '20px',
    height: '20px'
  },
});

import { useQuery } from '@apollo/react-hooks';
import SNIPPET_QUERY from '../../graphql/queries/snippet.query';

const SnippetDisplay = snippet => {
  const classes = useStyles();

  const {snippetId = '' } = snippet;
  const { data: { getSnippet = {} } = {}, loading, error } = useQuery(SNIPPET_QUERY, {
    variables: { id: snippetId },
  });

  return (
    <>
      <ListItem className={classes.groupSnippetListItem}>
        <h2 className={classes.snippetTitle}>{getSnippet.title}</h2>
        <Avatar className={classes.snippetAvatar} src={getSnippet.userPicture}></Avatar>
        <p>{getSnippet.author}</p>
      </ListItem>
      <Divider />
    </>
  );
};

const Groups = (props) => {
  const classes = useStyles();
  const { setFilter = () => {}, filters = [], groups = [], loading } = props;
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

  if (loading) {
    return (
      <p>Loading..</p>  
    );
  }

  return (
    <Grid container spacing={3}>
      {groups && groups.map(group => {
        console.log(groups);
          return <Grid item xs={12} sm={6} md={4} key={`group__${group._id}`}>
            <Link href="/groups/[sid]" as={`/groups/${group._id}`}>
              <Card className={classes.root} width={286}>
                <CardActionArea>
                  <CardContent>
                    <div className={classes.groupHeader}>
                      <div>
                        <Typography variant="h6" component="h2">{group.groupTitle}</Typography>
                        <List>
                        {group.snippets.map(snippet => <SnippetDisplay snippetId={snippet} />)}
                        </List>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>;
        })}
    </Grid>
  );
};

export default Groups;
