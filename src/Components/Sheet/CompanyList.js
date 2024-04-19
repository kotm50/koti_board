import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosInstance from "../../Api/axiosInstance";
import Pagenate from "../Layout/Pagenate";

function CompanyList() {
  const thisLocation = useLocation();
  const pathName = thisLocation.pathname;
  const parsed = queryString.parse(thisLocation.search);
  const page = parsed.page || 1;
  const searchKeyword = parsed.searchKeyword || null;
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pagenate, setPagenate] = useState([]);
  const user = useSelector(state => state.user);
  useEffect(() => {
    getList(page, searchKeyword);
    //eslint-disable-next-line
  }, [thisLocation]);

  const getList = async (page, searchKeyword) => {
    let pageNum = 1;
    if (page) {
      pageNum = Number(page);
    }
    const data = {
      page: pageNum,
      size: 20,
    };
    if (searchKeyword) {
      data.searchKeyword = searchKeyword;
    }
    await axiosInstance
      .post("/api/v1/ad/comp/list", data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
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
  return (
    <div className="px-4">
      {list && list.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody>
            {list.map((doc, idx) => (
              <tr key={idx}>
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
                  {doc.province} {doc.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Pagenate
        page={Number(page)}
        keyword={searchKeyword}
        totalPage={Number(totalPage)}
        pagenate={pagenate}
        pathName={pathName}
      />
    </div>
  );
}

export default CompanyList;
