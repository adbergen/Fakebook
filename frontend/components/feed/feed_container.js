import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUsers } from '../../actions/users_actions';
import { createPost, fetchPosts, fetchPost, deletePost } from '../../actions/posts_actions';
import { createLike, deleteLike } from '../../actions/likes_actions';
import { createComment, updateComment, deleteComment } from '../../actions/comments_actions';
import Feed from './feed';

const mapStateToProps = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    posts: state.entities.posts,
    users: state.entities.users,
    comments: state.entities.comments,
    correctReceivers: [state.entities.users[state.session.id].id].concat(state.entities.users[state.session.id].friendIds),
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    fetchUsers: () => dispatch(fetchUsers()),
    createPost: post => dispatch(createPost(post)),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPost: (id, post) => dispatch(fetchPost(id, post)),
    deletePost: id => dispatch(deletePost(id)),
    createComment: comment => dispatch(createComment(comment)),
    updateComment: (id, comment) => dispatch(updateComment(id, comment)),
    deleteComment: id => dispatch(deleteComment(id)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);