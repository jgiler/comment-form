import React from "react";

function ReplyForm(props) {
  return (
    <div>
      <form>
        <textarea type="text" className="comment-box" />
        <button
          type="button"
          onClick={event => props.submitReplyComment(event, props.index)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReplyForm;
