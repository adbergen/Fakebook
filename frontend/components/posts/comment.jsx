import React from 'react';
import { Link } from 'react-router-dom';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLikedIds = this.checkLikedIds.bind(this);
  }

  checkLikedIds() {
    let likedIds = [];
    this.props.comment.likes.forEach(like => {
        likedIds.push(like.userId);
    });
    return likedIds.includes(this.props.currentUser.id);
}

  handleSubmit(e) {
    e.preventDefault();
    if (!this.checkLikedIds()) {
        this.props.createLike({like: {likeable_id: this.props.comment.id, likeable_type: "Comment"}});
    } else {
        let likeId;
        this.props.comment.likes.forEach(like => {
            if (like.userId == this.props.currentUser.id) {
                likeId = like.likeId;
            }
        });
        this.props.deleteLike({id: likeId});
    }
}

    render() {
    
    const author = (<Link className="comment-author" to={`/home/users/${this.props.comment.authorId}`}>
    {this.props.users[this.props.comment.authorId].first_name} {this.props.users[this.props.comment.authorId].last_name}
    </Link>);

const periods = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  };

  const time = ((new Date()) - (new Date(this.props.comment.created_at)))
  
  function formatTime(time) {
  
    if (time > periods.year) {
        return Math.floor(time / periods.year) + "y";
    } else if (time > periods.month) {
      return Math.floor(time / periods.month) + "mon";
    } else if (time > periods.week) {
      return Math.floor(time / periods.week) + "w";
    } else if (time > periods.day) {
      return Math.floor(time / periods.day) + "d";
    } else if (time > periods.hour) {
      return Math.floor(time / periods.hour) + "h";
    } else if (time > periods.minute) {
      return Math.floor(time / periods.minute) + "m";
    } else {
    return "Just now";
    }
  }

    const timeAgoComment = (<p className="time-comment">{formatTime(time)}</p>)

    let commentLikesNumber;
    if (this.props.comment.likes.length > 0) {
      commentLikesNumber = (
        <div className="comment-number-liked">
          <img src="https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Like.png?resize=300%2C300" alt=""/> <p>{this.props.comment.likes.length}</p>
        </div>)
    } else {
      commentLikesNumber = (<div></div>);
    }

    let isCommentLiked;
    let commentLikedId = [];
    this.props.comment.likes.forEach(like => {
      commentLikedId.push(like.userId);
    })

    if (commentLikedId.includes(this.props.currentUser.id)) {
      isCommentLiked = "user-liked-comment";
    } else {
      isCommentLiked = "user-not-liked-comment";
    }

    return (
        <div className="comment">
          <div className="comment-image-container">
            <img className="comment-image" src={this.props.users[this.props.comment.authorId].profile_pic_url} alt=""/>
          </div>
            <div className="comment-body">
            <p className="comment-border">{author} {this.props.comment.body}</p>
            {commentLikesNumber}
            <div className="beneath-comment-text">
              <a className="comment-like-link" id={isCommentLiked} onClick={this.handleSubmit} href="">Like</a>
                {timeAgoComment}
                </div>
            </div>
        </div>
        )
    }
}

export default Comment;