import React from "react";
import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <div className="flex flex-col justify-start divide-y border-y">
      <div className={`p-3 font-bold`}>광고진행표(임시)</div>
      <div
        className={`bg-gray-100 flex flex-col justify-start divide-y border-y`}
      >
        <Link
          to="/main/company"
          className={`px-3 py-2 text-sm hover:bg-gray-200 hover:text-rose-500 transition-all duration-300`}
        >
          고객사목록
        </Link>
      </div>
      <div className={`p-3 font-bold`}>게시판</div>
      <div
        className={`bg-gray-100 flex flex-col justify-start divide-y border-y`}
      >
        <Link
          to="/board/list/B06"
          className={`px-3 py-2 text-sm hover:bg-gray-200 hover:text-rose-500 transition-all duration-300`}
        >
          광고 게시판
        </Link>
        <Link
          to="/board/list/B04"
          className={`px-3 py-2 text-sm hover:bg-gray-200 hover:text-rose-500 transition-all duration-300`}
        >
          회의록 게시판
        </Link>
      </div>
    </div>
  );
}

export default Menu;
