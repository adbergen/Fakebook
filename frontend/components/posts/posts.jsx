import React from 'react';
import Post from './post';

class Posts extends React.Component {
    render() {
      const postsArr = Object.values(this.props.posts);
      
      function quicksort(array) {
        if(array.length < 2) {
          return array;
        }
        let pivot = array[0];
        let lesser = [];
        let greater = [];
        for(let i = 1; i < array.length; i++) {
          if(array[i].createdAt < pivot.createdAt) {
            lesser.push(array[i]);
          } else {
            greater.push(array[i]);
          }
        }
        return quicksort(greater).concat(pivot, quicksort(lesser));
      }

      const formattedPosts = quicksort(postsArr).map((post, id) => {
        if (this.props.correctReceivers.includes(post.receiverId)) {
            return (<Post
              type={this.props.type}
              createLike={this.props.createLike}
              deleteLike={this.props.deleteLike}
              key={id} post={post}
              users={this.props.users}
              currentUser={this.props.currentUser}
              createComment={this.props.createComment}
              updateComment={this.props.updateComment}
              deleteComment={this.props.deleteComment}
              fetchPost={this.props.fetchPost}
              deletePost={this.props.deletePost}
          />);
        }
      });
      if (Object.values(this.props.posts).length > 0) {
        return (
          <div className="posts-header">
            <h5>POSTS</h5>
            <div className="posts">
              {formattedPosts}
            </div>
          </div>
          )
      } else {
        return (<div>
            <img className="loading-gif" src={window.facebookGif} alt=""/>
          </div>)
      }
  } 
}

export default Posts;