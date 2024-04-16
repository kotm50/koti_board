import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../Reducer/userSlice";

import { category } from "../../Api/Category";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modulesB, formats } from "../Layout/QuillModule";
import axiosInstance from "../../Api/axiosInstance";

function Write() {
  const navi = useNavigate();
  const thisLocation = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { bid, pid } = useParams();
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [cateValue, setCateValue] = useState("");
  const [adUrl, setAdUrl] = useState("");
  const [compNum, setCompNum] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalNum, setTotalNum] = useState("");
  const [managerName, setManagerName] = useState("");

  useEffect(() => {
    console.log(user);
    if (pid) {
      getPost(pid);
    }
    setUserName(user.userName);
    //eslint-disable-next-line
  }, [thisLocation]);

  const getPost = async pid => {
    const data = {
      boardId: bid,
      postId: pid,
    };

    await axiosInstance
      .post("/api/v1/board/admin/post/data", data, {
        headers: { Authorization: user.accessToken },
      })
      .then(async res => {
        if (res.data.code === "E999" || res.data.code === "E403") {
          logout();
          return false;
        }
        if (res.data.code === "C000") {
          const post = res.data.post;
          const unescapeContent = await unescapeHTML(post.content);
          setUserName(post.userName);
          setTitle(post.title);
          setContent(unescapeContent);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const resetIt = () => {
    const confirm = window.confirm(
      "입력한 내용이 전부 사라집니다. 진행할까요?"
    );
    if (!confirm) {
      return false;
    } else {
      navi(-1);
    }
  };

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
        navi("/");
      });
  };

  const submit = async () => {
    const escapeContent = await escapeHTML(content);
    if (category === "") {
      return alert("카테고리를 설정해 주세요");
    }
    let data = {
      boardId: bid, // 게시판id
      userId: user.userId,
      managerName: managerName, // 작성자(담당자)
      title: title, // 제목
      content: escapeContent, // 내용
      compNum: compNum, // 고객사번호 4자리
      adUrl: adUrl, // 광고URL
      category: cateValue, // 카테고리
      adStartDate: startDate,
      adEndDate: endDate,
      totalNum: totalNum,
    };
    if (pid) {
      data.postId = pid;
    }

    console.log(data);

    await axiosInstance
      .post("/api/v1/board/manager/post/add", data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        alert(res.data.message);
        if (res.data.code === "E999" || res.data.code === "E403") {
          logout();
          return false;
        }
        if (res.data.code === "C000") {
          navi(`/board/list/${bid}`);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const escapeHTML = text => {
    return text
      .replace(/</g, "＜")
      .replace(/>/g, "＞")
      .replace(/=/g, "＝")
      .replace(/\(/g, "（")
      .replace(/\)/g, "）")
      .replace(/,/g, "，")
      .replace(/"/g, "＂")
      .replace(/:/g, "：")
      .replace(/;/g, "；")
      .replace(/\//g, "／");
  };

  const unescapeHTML = text => {
    return text
      .replace(/＜/g, "<")
      .replace(/＞/g, ">")
      .replace(/＝/g, "=")
      .replace(/（/g, "(")
      .replace(/）/g, ")")
      .replace(/，/g, ",")
      .replace(/＂/g, '"')
      .replace(/：/g, ":")
      .replace(/；/g, ";")
      .replace(/／/g, "/");
  };

  return (
    <div className="mx-4">
      <div className="p-3 bg-white drop-shadow flex flex-col justify-start gap-y-2">
        <div className="grid grid-cols-2 gap-y-2 gap-x-2">
          <div className="flex flex-row flex-nowrap justify-start  gap-x-[12px] col-span-2">
            <div className="w-[108px] p-2 bg-gray-50 text-lg font-bold text-right">
              카테고리
            </div>
            <div className="w-full text-lg">
              <select
                value={cateValue}
                className="py-2 pr-10 border border-gray-300"
                onChange={e => setCateValue(e.currentTarget.value)}
              >
                <option value="">카테고리 선택</option>
                {category.map((cat, idx) => (
                  <option key={idx} value={cat.value}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-row flex-nowrap justify-start gap-x-[8px] hidden">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              작성자
            </div>
            <div className="w-full text-lg py-2">{userName}</div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              담당자
            </div>
            <div className="w-full">
              <input
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={managerName}
                placeholder="담당자 이름을 입력하세요"
                onChange={e => setManagerName(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              고객사번호
            </div>
            <div className="w-full">
              <input
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={compNum}
                placeholder="고객사 번호 4자리를 입력하세요"
                onChange={e => setCompNum(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              광고URL
            </div>
            <div className="w-full">
              <input
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={adUrl}
                placeholder="채용광고 URL을 입력하세요"
                onChange={e => setAdUrl(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              참석자 수
            </div>
            <div className="w-full">
              <input
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={totalNum}
                placeholder="참석자 수를 숫자로 입력해 주세요"
                onChange={e => setTotalNum(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              시작일
            </div>
            <div className="w-full">
              <input
                type="date"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                id="startDate"
                value={startDate}
                onChange={e => setStartDate(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-start gap-x-[8px]">
            <div className="w-[120px] p-2 bg-gray-50 text-lg font-bold text-right">
              종료일
            </div>
            <div className="w-full">
              <input
                type="date"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                id="endDate"
                value={endDate}
                onChange={e => setEndDate(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-nowrap justify-start gap-x-[12px]">
          <div className="w-[108px] p-2 bg-gray-50 text-lg font-bold text-right">
            제목
          </div>
          <div className="w-full">
            <input
              type="text"
              className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={e => setTitle(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex flex-row flex-nowrap justify-start gap-x-[12px]">
          <div className="w-[108px] p-2 bg-gray-50 text-lg font-bold text-right">
            내용
          </div>
          <ReactQuill
            modules={modulesB}
            formats={formats}
            theme="snow"
            value={content}
            onChange={setContent}
            className="p-0 w-full border-0 bg-white h-full quillCustomC"
            placeholder="여기에 내용을 입력하세요"
          />
        </div>
      </div>
      <div className="flex justify-center gap-x-2 mt-4">
        <button
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded"
          onClick={submit}
        >
          저장하기
        </button>
        <button
          className="p-2 bg-gray-300 hover:bg-gray-700 hover:text-white rounded"
          onClick={resetIt}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default Write;
