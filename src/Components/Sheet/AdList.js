import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axiosInstance from "../../Api/axiosInstance";
import Pagenate from "../Layout/Pagenate";

import { FaSearch } from "react-icons/fa";
import InputAd from "./InputAd";

import dayjs from "dayjs";

function AdList() {
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
  const [adInfo, setAdInfo] = useState(null);
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
      .post("/api/v1/ad/prog/list", data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        console.log(res);
        setList(res.data.progressList);
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

  const getDate = d => {
    const date = new Date(d);
    const formatted = dayjs(date).format("YY/MM/DD");
    return formatted;
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
          광고 등록
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
        <table className="border-collapse text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                고객사번호
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                파트너
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                등급
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                구분
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={11}
              >
                고객사정보
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                케어
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                더블
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={2}
              >
                지점위치
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={2}
              >
                천국
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={2}
              >
                몬
              </th>
              <th
                className="break-keep py-[2px] px-[6px] bg-[#ff0] text-black align-middle border text-center"
                colSpan={4}
              >
                누적사용
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                면접비
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={3}
              >
                채용팀 전달사항
              </th>
            </tr>
            <tr className="bg-blue-600 text-white">
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                보험사
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                채널
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                지점
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                담당
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                결제
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={2}
              >
                로고
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                colSpan={2}
              >
                일정
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                기간
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                광고
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                지역
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                구
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                M지역
                <br />
                G결합
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                슈퍼점프
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                M지역
                <br />
                G결합
              </th>
              <th
                className="break-keep py-[2px] px-[6px] align-middle border text-center"
                rowSpan={2}
              >
                슈퍼점프
              </th>
              <th
                className="break-keep py-[2px] px-[6px] bg-[#ff0] text-black align-middle border text-center"
                rowSpan={2}
              >
                천로컬
              </th>
              <th
                className="break-keep py-[2px] px-[6px] bg-[#ff0] text-black align-middle border text-center"
                rowSpan={2}
              >
                천점프
              </th>
              <th
                className="break-keep py-[2px] px-[6px] bg-[#ff0] text-black align-middle border text-center"
                rowSpan={2}
              >
                몬로컬
              </th>
              <th
                className="break-keep py-[2px] px-[6px] bg-[#ff0] text-black align-middle border text-center"
                rowSpan={2}
              >
                몬점프
              </th>
            </tr>
            <tr className="bg-blue-600 text-white">
              <th className="py-[2px] px-[6px] align-middle border text-center">
                천국
              </th>
              <th className="py-[2px] px-[6px] align-middle border text-center">
                몬
              </th>
              <th className="py-[2px] px-[6px] align-middle border text-center">
                시작
              </th>
              <th className="py-[2px] px-[6px] align-middle border text-center">
                마감
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((doc, idx) => (
              <tr
                key={idx}
                className="bg-white hover:cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setAdInfo(doc);
                  setModalOn(true);
                }}
              >
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.adNum}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.userName}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.tierAliasName}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.gubun}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.compName}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.channel}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.compBranch}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.manager1}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.paymentOption}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.heavenLogo}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.monLogo}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {getDate(doc.adStartDate)}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {getDate(doc.adEndDate)}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center"></td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.registeredStatus === "N"
                    ? "등록전"
                    : doc.registeredStatus === "S"
                    ? "등록중"
                    : doc.registeredStatus === "Y"
                    ? "완료"
                    : ""}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.careService}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.dualType}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.province}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.city}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.heavenLocalDay}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.heavenJumpDay}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.monLocalDay}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.monJumpDay}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.heavenLocalAccCount}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.heavenJumpAccCount}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.monLocalAccCount}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.monJumpAccCount}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center">
                  {doc.intvPay || ""}
                </td>
                <td className="break-keep py-[2px] px-[6px] border text-center truncate">
                  {doc.bigo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {modalOn && (
        <InputAd
          adInfo={adInfo}
          setAdInfo={setAdInfo}
          setModalOn={setModalOn}
          user={user}
          getList={getList}
          page={page}
          keyword={keyword}
        />
      )}
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

export default AdList;
