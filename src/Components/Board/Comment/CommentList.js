import React from "react";
import dayjs from "dayjs";
function CommentList(props) {
  return (
    <div
      className={`flex flex-col justify-start divide-y ${
        props.isDetail && "border-y"
      }`}
    >
      {props.list && props.list.length > 0 ? (
        <>
          {props.list.map((com, idx) => (
            <div
              key={idx}
              className={`flex justify-center p-2 ${
                props.isDetail && props.user.userName === com.userName
                  ? "text-blue-600 bg-blue-50"
                  : "text-black bg-white"
              }`}
            >
              <div className="w-[10%]">{com.userName}</div>
              <div className="w-[75%] mx-[2.5%] text-left text-wrap break-words">
                {com.content}
              </div>
              <div className="w-[10%]">
                {dayjs(new Date(com.regDate)).format("YYYY-MM-DD")}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-2">등록된 답변이 없습니다</div>
      )}
    </div>
  );
}

export default CommentList;
