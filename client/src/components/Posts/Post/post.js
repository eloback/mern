import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

import useStyles from "./styles"
import {deletePost, likePost} from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
      let postLikesLength = post.likes.length;
      if(postLikesLength > 0){
        return post.likes.find((like) => like === (user?.result?.googleId ||  user?.result?._id)) ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{postLikesLength > 2 ? `You and ${postLikesLength - 1} others ` : `${postLikesLength} like${post.likes.lengh > 1 ?  's'  :  ''}`  }</>
            ) :  (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{postLikesLength} {postLikesLength === 1 ? 'Like' : 'Likes'  }</>
        );
      }
      return (<><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>);
   };

const openPost = () => {
  history.push(`/posts/${post._id}`)
};

return (<Card className={classes.card} raised elevation={6}>
  <ButtonBase className={classes.cardAction} onClick={openPost}>
    <CardMedia className={classes.media} image={post.selectedFile || 'https://i.stack.imgur.com/6M513.png'} title={post.title}/>
    <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
    </div>
    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (<div className={classes.overlay2} name="edit">
    <Typography
      onClick={(e) => {
        e.stopPropagation();
        console.log("edit")//setCurrentId(post._id);
      }}
      style={{color: 'white'}}
      size="small"
    >
      <MoreHorizIcon fontSize="default" />
    </Typography>
  </div>)}
    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
    <CardContent>
      <Typography variant="body2"color="textSecondary" component="p">{post.message}</Typography>
    </CardContent>
    </ButtonBase>
  <CardActions className={classes.cardActions}>
    <Button size="small" disabled={!user
        ?.result} color="primary" onClick={() => dispatch(likePost(post._id))}>
      <Likes/>
    </Button>
    {
      (
        user
        ?.result
          ?.googleId === post
            ?.creator || user
              ?.result
                ?._id === post
                  ?.creator) && (<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                  </Button>)
    }
  </CardActions>
</Card>)
}

export default Post;
