import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Reducer/userSlice";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import axiosInstance from "../Api/axiosInstance";
import Menu from "./Layout/Menu";

function Board() {
  const [title, setTitle] = useState("광고 게시판");
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const logout = async () => {
    await axiosInstance
      .post("/api/v1/user/logout", null, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        dispatch(clearUser());
        navi("/");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-[240px] pb-4 border-r bg-white shadow-lg flex flex-col justify-between transition-all duration-300"
        style={{ marginLeft: `${open ? 0 : -240}px` }}
      >
        <button
          className={`transition-all font-bold duration-300 bg-indigo-100 hover:bg-indigo-50 p-2 absolute top-0 right-0 ${
            !open && "translate-x-[48px] border"
          } w-[48px] h-[48px]`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? <FaCaretRight size={32} /> : <FaCaretLeft size={32} />}
        </button>
        <div>
          <Link to="/collect">
            <h2 className="font-bold px-4 text-xl h-[48px] flex flex-col justify-center">
              코티 수금전산
            </h2>
          </Link>
          <Menu />
        </div>
        <div className="p-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white p-2 w-full hover:rounded-lg transition-all duration-300"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div
        className="duration-300 transition-all"
        style={{ paddingLeft: `${open ? 250 : 50}px` }}
      >
        <h1 className="my-8 mx-4 text-3xl">{title}</h1>
        <Outlet context={[title, setTitle]} logout={logout} />
      </div>
    </>
  );
}

export default Board;
