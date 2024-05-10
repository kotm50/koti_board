import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axiosInstance from "../../Api/axiosInstance";
import Pagenate from "../Layout/Pagenate";

import { FaSearch } from "react-icons/fa";
import InputCompany from "./InputCompany";

function CompanyList() {
  const navi = useNavigate();
  const thisLocation = useLocation();
  const pathName = thisLocation.pathname;
  const parsed = queryString.parse(thisLocation.search);
  const page = parsed.page || 1;
  const keyword = parsed.keyword || null;
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pagenate, setPagenate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [modalOn, setModalOn] = useState(false);
  const [compInfo, setCompInfo] = useState(null);
  const user = useSelector(state => state.user);

  useEffect(() => {
    getList(page, keyword);
    //eslint-disable-next-line
  }, [thisLocation]);

  const getList = async (page, keyword) => {
    let pageNum = 1;
    if (page) {
      pageNum = Number(page);
    }
    let data = {
      page: pageNum,
      size: 20,
    };
    if (keyword) {
      data.searchKeyword = keyword;
      setSearchKeyword(keyword);
    }
    await axiosInstance
      .post("/api/v1/ad/comp/list", data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        console.log(res);
        setList(res.data.adCompList);
        const totalP = res.data.totalPages;
        setTotalPage(res.data.totalPages);
        const pagenate = generatePaginationArray(page, totalP);
        setPagenate(pagenate);
      })
      .catch(e => {
        console.log(e);
      });
    function generatePaginationArray(currentPage, totalPage) {
      let paginationArray = [];

      // 최대 페이지가 4 이하인 경우
      if (Number(totalPage) <= 4) {
        for (let i = 1; i <= totalPage; i++) {
          paginationArray.push(i);
        }
        return paginationArray;
      }

      // 현재 페이지가 1 ~ 3인 경우
      if (Number(currentPage) <= 3) {
        return [1, 2, 3, 4, 5];
      }

      // 현재 페이지가 totalPage ~ totalPage - 2인 경우
      if (Number(currentPage) >= Number(totalPage) - 2) {
        return [
          Number(totalPage) - 4,
          Number(totalPage) - 3,
          Number(totalPage) - 2,
          Number(totalPage) - 1,
          Number(totalPage),
        ];
      }

      // 그 외의 경우
      return [
        Number(currentPage) - 2,
        Number(currentPage) - 1,
        Number(currentPage),
        Number(currentPage) + 1,
        Number(currentPage) + 2,
      ];
    }
  };

  const searchIt = () => {
    if (searchKeyword === "") {
      return alert("검색어를 입력하세요");
    }
    const keyword = searchKeyword.trim();
    let domain = `${pathName}?page=1${
      keyword !== "" ? `&keyword=${keyword}` : ""
    }`;
    navi(domain);
  };

  const deleteComp = async code => {
    const really = window.confirm("삭제하면 복구할 수 없습니다\n진행할까요?");
    if (!really) {
      return false;
    }
    const data = {
      compCode: code,
    };
    await axiosInstance
      .delete("/api/v1/ad/del/comp", {
        data: data,
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        alert("삭제했습니다");
        getList(page, keyword);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="px-4">
      <div className="flex justify-between mb-4">
        <button
          className="py-2 px-5 bg-blue-600 text-white rounded-lg"
          onClick={() => {
            setModalOn(true);
          }}
        >
          고객사 추가
        </button>
        <div className="flex justify-start gap-x-2">
          <input
            value={searchKeyword}
            className="border border-gray-300 p-2 w-80 block rounded font-neo"
            placeholder="지점명/담당자명 으로 검색"
            onChange={e => setSearchKeyword(e.currentTarget.value)}
            onKeyDown={e => e.key === "Enter" && searchIt()}
          />
          <button
            className="py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded transition-all duration-300"
            onClick={() => searchIt()}
          >
            <FaSearch />
          </button>
          {keyword && (
            <div className="py-2">
              <span className="text-red-600 font-neoextra">{keyword}</span>로
              검색한 결과입니다.
            </div>
          )}
        </div>
      </div>
      {list && list.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-1 bg-blue-600 text-white border text-center">
                등급
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                고객사번호
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                구분
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                채널
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                고객사명
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                지점명
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                담당자1
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                연락처1
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                담당자2
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                연락처2
              </th>
              <th className="p-1 bg-blue-600 text-white border text-center">
                근무지 지역
              </th>
              <th
                className="p-1 bg-blue-600 text-white border text-center"
                colSpan={2}
              >
                수정/삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((doc, idx) => (
              <tr key={idx}>
                <td className="p-1 bg-white border text-center">
                  {doc.tierAliasName || ""}
                </td>
                <td className="p-1 bg-white border text-center">{doc.adNum}</td>
                <td className="p-1 bg-white border text-center">{doc.gubun}</td>
                <td className="p-1 bg-white border text-center">
                  {doc.channel || "기타"}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.compName}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.compBranch}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.manager1}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.phone1}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.manager2}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.phone2}
                </td>
                <td className="p-1 bg-white border text-center">
                  {doc.province} {doc.city} {doc.address}
                </td>
                <td className="p-1 bg-white border text-center text-sm">
                  <button
                    className="py-1 px-4 bg-green-600 text-white font-neoextra"
                    onClick={() => {
                      setCompInfo(doc);
                      setModalOn(true);
                    }}
                  >
                    수정
                  </button>
                </td>
                <td className="p-1 bg-white border text-center text-sm">
                  <button
                    className="py-1 px-4 bg-red-600 text-white font-neoextra"
                    onClick={() => deleteComp(doc.compCode)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <div className="py-2">
        <button
          className="py-2 px-5 bg-blue-600 text-white rounded-lg"
          onClick={() => {
            setModalOn(true);
          }}
        >
          고객사 추가
        </button>
        {modalOn && (
          <InputCompany
            compInfo={compInfo}
            setCompInfo={setCompInfo}
            setModalOn={setModalOn}
            user={user}
            getList={getList}
            page={page}
            keyword={keyword}
          />
        )}
      </div>
      <Pagenate
        page={Number(page)}
        keyword={keyword}
        totalPage={Number(totalPage)}
        pagenate={pagenate}
        pathName={pathName}
      />
    </div>
  );
}

export default CompanyList;
