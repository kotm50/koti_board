import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import axiosInstance from "../../../Api/axiosInstance";

function Comment(props) {
  const [list, setList] = useState([]);
  //const [comment, setComment] = useState(null)

  useEffect(() => {
    getCommentList(props.postCode);
    //eslint-disable-next-line
  }, [props.postCode]);

  const getCommentList = async code => {
    const data = {
      postCode: code,
    };

    await axiosInstance
      .post("/api/v1/board/manager/comment/list", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        setList(res.data.commentList);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const inputContent = async content => {
    const data = {
      userId: props.user.userId,
      content: content,
      postCode: props.postCode,
    };
    await axiosInstance
      .post("/api/v1/board/manager/comment/add", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        if (res.data.code === "C000") {
          getCommentList(props.postCode);
        } else {
          alert(res.data.message);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <CommentList list={list} user={props.user} isDetail={props.isDetail} />
      {props.isDetail ? (
        <CommentWrite
          list={list}
          user={props.user}
          postCode={props.postCode}
          inputContent={inputContent}
          getCommentList={getCommentList}
        />
      ) : null}
    </div>
  );
}

export default Comment;
