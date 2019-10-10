import React from "react";
import "./App.css";
import ReplyForm from "./components/ReplyForm";
import RepliedComment from "./components/RepliedComment";

class App extends React.Component {
  state = {
    comments: [],
    commentDescription: "",
  };

  getUserComment = event => {
    this.setState({
      commentDescription: event.target.value,
    });
  };

  submitComment = () => {
    console.log(this.state.commentDescription);
    const commentsCopy = [...this.state.comments]; //copy of comments array
    const commentsObj = {
      commentDescription: this.state.commentDescription,
      likes: 0,
      dislikes: 0,
      replies: [],
      showReplyForm: false,
    };
    commentsCopy.push(commentsObj);
    this.setState({
      comments: commentsCopy,
    });
  };

  deleteComment = index => {
    console.log(index);
    const commentsCopy = [...this.state.comments];
    commentsCopy.splice(index, 1);
    this.setState({
      comments: commentsCopy,
    });
  };

  likesComment = index => {
    console.log(index);
    const commentsCopy = [...this.state.comments];
    commentsCopy[index].likes += 1;
    this.setState({ commets: commentsCopy });
  };

  dislikesComment = index => {
    console.log(index);
    const commentsCopy = [...this.state.comments];
    commentsCopy[index].dislikes += 1;
    this.setState({ comments: commentsCopy });
  };

  showReplyForm = index => {
    const commentsCopy = [...this.state.comments];
    commentsCopy[index].showReplyForm = !commentsCopy[index].showReplyForm;
    this.setState({ comments: commentsCopy });
  };

  submitReplyComment = (event, index) => {
    console.log(event.target.previousSibling.value);
    const commentsCopy = [...this.state.comments];
    const commentsObj = {
      commentDescription: event.target.previousSibling.value,
      likes: 0,
      dislikes: 0,
    };
    commentsCopy[index].replies.push(commentsObj);
    commentsCopy[index].showReplyForm = !commentsCopy[index].showReplyForm;
    this.setState({ comments: commentsCopy });
  };

  likeRepliedComment = (indexToOriginalComment, indexToRepliedComment) => {
    const commentsCopy = [...this.state.comments];
    commentsCopy[indexToOriginalComment].replies[
      indexToRepliedComment
    ].likes += 1;
    this.setState({ commets: commentsCopy });
  };

  dislikeRepliedComment = (indexToOriginalComment, indexToRepliedComment) => {
    const commentsCopy = [...this.state.comments];
    commentsCopy[indexToOriginalComment].replies[
      indexToRepliedComment
    ].dislikes += 1;
    this.setState({ commets: commentsCopy });
  };

  deleteRepliedComment = (indexToOriginalComment, indexToRepliedComment) => {
    const commentsCopy = [...this.state.comments];
    commentsCopy[indexToOriginalComment].replies.splice(
      indexToRepliedComment,
      1
    );
    this.setState({
      comments: commentsCopy,
    });
  };

  render() {
    const { comments } = this.state;
    const allComments = comments.map((commentObj, originalCommentIndex) => {
      return (
        <div className='container'>
          <h1>Thank you for commenting</h1>
          <div key={commentObj.commentDescription + originalCommentIndex}>
            {commentObj.commentDescription}
            <button onClick={() => this.likesComment(originalCommentIndex)}>
              Like
            </button>
            <p>{commentObj.likes}</p>
            <button onClick={() => this.dislikesComment(originalCommentIndex)}>
              Dislike
            </button>
            <p>{commentObj.dislikes}</p>
            <button onClick={() => this.showReplyForm(originalCommentIndex)}>
              Reply
            </button>
            <button onClick={() => this.deleteComment(originalCommentIndex)}>
              Delete
            </button>
          </div>
          {commentObj.replies.map((repliedCommentObj, repliedCommentIndex) => {
            return (
              <RepliedComment
                originalCommentIndex={originalCommentIndex}
                repliedCommentObj={repliedCommentObj}
                repliedCommentIndex={repliedCommentIndex}
                likeRepliedComment={this.likeRepliedComment}
                dislikeRepliedComment={this.dislikeRepliedComment}
                deleteRepliedComment={this.deleteRepliedComment}
              />
            );
          })}
          {commentObj.showReplyForm && (
            <ReplyForm
              index={originalCommentIndex}
              submitReplyComment={this.submitReplyComment}
            />
          )}
        </div>
      );
    });

    return (
      <div className='comment'>
        <h1>Please enter a comment</h1>
        <form>
          <textarea
            onChange={this.getUserComment}
            type="text"
            className="comment-box"
          />
          <button onClick={this.submitComment} type="button">
            Submit
          </button>
        </form>
        <div>{allComments.length > 0 ? allComments : "No comments yet."}</div>{" "}
        {/* ternary */}
      </div>
    );
  }
}

export default App;
