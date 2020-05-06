import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import SNIPPETS_QUERY from '../../graphql/queries/snippets.query';

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
  }
});

const Snippets = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState([]);
  const { data, loading, error, refetch } = useQuery(SNIPPETS_QUERY, {
    variables: { filters },
    pollInterval: 500000,
  });

  const addFilter = value => {
    if (!filters.includes(value)) {
      setFilters([
        ...filters,
        value
      ]);
    } else {
      setFilters(filters.filter((filter)=>(filter !== value)));
      refetch();
    }
  };

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
      onClick={() => { addFilter(value) }}
    /></ListItem>)
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

      {data && data.getSnippets.map(snippet => {
          return <Grid item xs={12} sm={6} md={3} key={`snippet__${snippet._id}`}>
            <Link href="/snippet/[sid]" as={`/snippet/${snippet._id}`}>
              <Card className={classes.root} width={286}>
                <CardActionArea>
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
                    </div>
                    <div className={classes.attributes}>
                      {snippet.versions &&
                        snippet.versions.map(version => {
                          return <Chip
                            size="small"
                            avatar={<Avatar>{version}</Avatar>}
                            label={version}
                            key={`${snippet._id}-${version}`}
                          />
                        })
                      }
                    </div>
                    <div className={classes.attributes}>
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
                </CardActionArea>
              </Card>
            </Link>
          </Grid>;
        })}
    </Grid>
  );
};

export default Snippets;
