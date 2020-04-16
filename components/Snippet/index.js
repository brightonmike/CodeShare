import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { codeFormatter } from '../../hooks/code-formatter';

const useStyles = makeStyles({
  root: {
    minWidth: 1200,
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  snippetHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  snippetAvatar: {
    marginRight: '20px'
  },
  attributes: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 10px 10px 0'
    },
  }
});


const Snippet = props => {
  const { snippet } = props;
  const classes = useStyles();

  if (!snippet || !snippet.code) {
      return (
        <CircularProgress color="secondary" />
      );
  }

  const copyCode = () => {
    // e.persist();

    if (document.queryCommandSupported('copy')) {
      const copyText = new Promise((resolve, reject) => {
        const innerText = document.querySelector('#snippet');
        innerText.select();
        try {
          const result = document.execCommand('copy');
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      copyText.then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  return (
    <Grid container spacing={3}>
      {snippet &&
        <Card id={snippet._id} className={classes.root} width={1000} key={`snippet__${snippet._id}`}>
          <CardActionArea>
            <CardContent>
              <div className={classes.snippetHeader}>
                <Avatar className={classes.snippetAvatar} src={snippet.userPicture}></Avatar>
                <div>
                  <Typography variant="h5" component="h2">{snippet.title}</Typography>
                  <Typography variant="subtitle1">{snippet.author}</Typography>
                </div>
              </div>

              <p dangerouslySetInnerHTML={{__html:snippet.comments}}/>

              <div className={classes.attributes}>
                {snippet.languages &&
                  snippet.languages.map(language => {
                    return <Chip
                      size="small"
                      key={language}
                      avatar={<Avatar>{language.charAt(0)}</Avatar>}
                      label={language}
                      color="primary"
                    />
                  })
                }
              </div>

              <div className={classes.attributes}>
                {snippet.versions &&
                  snippet.versions.map(version => {
                    return <Chip
                      size="medium"
                      key={version}
                      avatar={<Avatar>{version}</Avatar>}
                      label={version}
                    />
                  })
                }
              </div>

              <div className={classes.attributes}>
                {snippet.types &&
                  snippet.types.map(type => {
                    return <Chip
                      size="small"
                      key={type}
                      avatar={<Avatar>{type.charAt(0)}</Avatar>}
                      label={type}
                    />
                  })
                }
              </div>
            </CardContent>
            <CardContent>
              <pre><code dangerouslySetInnerHTML={codeFormatter(snippet.code)}></code></pre>
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </Grid>
  );
};

export default Snippet;
