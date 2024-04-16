import React, { useEffect, useState } from "react";

function CommentWrite(props) {
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent("");
  }, [props.list]);

  return (
    <div className="w-full flex justify-between gap-x-2">
      <div className="w-[5%] flex flex-col justify-start gap-y-0">
        <span className="text-center">{props.user.userName}</span>
      </div>
      <div className="w-[85%] h-[104px] border border-gray-500">
        <textarea
          className="w-full h-full"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
          onBlur={e => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div className="flex flex-col justify-start gap-y-2 w-[10%]">
        <button
          className="border border-green-600 bg-green-600 text-white hover:bg-green-400 hover:border-green-400 p-2 h-[60%]"
          onClick={() => props.inputContent(content)}
        >
          댓글입력
        </button>
        <button
          className="border border-gray-500 bg-gray-50 p-2 text-xs"
          onClick={() => props.getCommentList(props.postCode)}
        >
          추가댓글확인
        </button>
      </div>
    </div>
  );
}

export default CommentWrite;
