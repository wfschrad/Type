import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: ' 0 34px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardName: {
      display: 'flex',
      fontWeight: '600',
      fontSize: 24,
      justifyContent: 'center'
  },
  cardPType: {
    display: 'flex',
    fontWeight: '300',
    fontSize: 16,
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10
  },
  decisionButtons: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%'
  },
  bioField: {
      margin: '20px 34px 0 34px',
      textAlign: 'center'
  },
  match: {
      color: 'red'
  }
}));

export default function RecipeReviewCard({ name, typeName, bio, upload, defaultPic }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<div className={classes.cardName}>{name}</div>}
      />
      <CardMedia
        className={classes.media}
        image={upload ? upload : defaultPic}
        title="User photo"
      />
      <CardContent>
      <div className={classes.cardPType}>
      {typeName.toUpperCase()}
      </div>
        <Typography className={classes.bioField} variant="body2" color="textSecondary" component="p">
         {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <span className={classes.decisionButtons}>
        <IconButton aria-label="don't match">
          <NotInterestedIcon
           className={classes.match}
           />
        </IconButton>
        <IconButton aria-label="match">
        <FavoriteIcon
        className={classes.match} />
        </IconButton>
        </span>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
