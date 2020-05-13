import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Alert from '../../components/Alert';

import { codeFormatter } from '../../hooks/code-formatter';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: '800px',
  },
  media: {
    height: 140,
  },
  snippetHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  textarea: {
    color: 'white',
    height: '1px',
    border: 'none'
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
  const [open, setOpen] = useState(false);

  if (!snippet || !snippet.code) {
      return (
        <CircularProgress color="secondary" />
      );
  }

  const handleClose = () => {
    setOpen(false);
  };

  const copyCode = (e) => {
    e.persist();

    if (document.queryCommandSupported('copy')) {
      const copyText = new Promise((resolve, reject) => {
        const innerText = document.querySelector('#code');
        innerText.select();
        try {
          const result = document.execCommand('copy');
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      copyText.then(result => {
        setOpen(true);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  return (
    <>
      <Alert open={open} title="Code copied!" close={() => handleClose()} />
      {snippet &&
        <Card id={snippet._id} className={classes.root} width={1000} key={`snippet__${snippet._id}`}>
          <CardActionArea onClick={(e) => copyCode(e)}>
            <CardContent>
              <div className={classes.snippetHeader}>
                  <Avatar className={classes.snippetAvatar} src={snippet.userPicture}></Avatar>
                <div>
                  <Typography variant="h5" component="h2">{snippet.title}</Typography>
                  <Typography variant="subtitle1">{snippet.author}</Typography>
                </div>
              </div>

              {/* <button>copy</button> */}

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
              <TextField
                  multiline
                  variant="outlined"
                  margin="dense"
                  id="code"
                  rows="5"
                  label="Code"
                  type="text"
                  fullWidth
                  className={classes.textarea}
                  value={snippet.code}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </>
  );
};

export default Snippet;
