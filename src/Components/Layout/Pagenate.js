import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

function Pagenate(props) {
  const [isSearching, setIsSearching] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    if (props.keyword && props.keyword !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    if (props.isType && props.isType !== "") {
      setIsType(true);
    } else {
      setIsType(false);
    }
    if (props.delYn && props.delYn !== "N") {
      setIsDelete(true);
    } else {
      setIsDelete(false);
    }
    //eslint-disable-next-line
  }, [props.page]);
  return (
    <>
      {props.pagenate.length > 1 && (
        <div className="flex flex-row justify-center gap-3 my-5">
          {props.page > 2 && (
            <Link
              to={`${props.pathName}?page=1${
                isType ? `&type=${props.type}` : ""
              }${isSearching ? `&keyword=${props.keyword}` : ""}${
                isDelete ? `&delYn=Y` : ""
              }`}
              state={{ log: props.log }}
              className="transition duration-300 ease-in-out pageButton hover:scale-110 hidden xl:block"
            >
              <FaAngleDoubleLeft size={20} />
            </Link>
          )}

          {props.page > 1 && (
            <Link
              to={`${props.pathName}?page=${props.page - 1}${
                isType ? `&type=${props.type}` : ""
              }${isSearching ? `&keyword=${props.keyword}` : ""}${
                isDelete ? `&delYn=Y` : ""
              }`}
              state={{ log: props.log }}
              className="transition duration-300 ease-in-out pageButton hover:scale-110"
            >
              <FaAngleLeft size={20} />
            </Link>
          )}
          <div className="flex justify-center gap-3">
            {props.pagenate.map((pageNum, idx) => (
              <Link
                to={`${props.pathName}?page=${pageNum}${
                  isType ? `&type=${props.type}` : ""
                }${isSearching ? `&keyword=${props.keyword}` : ""}${
                  isDelete ? `&delYn=Y` : ""
                }`}
                state={{ log: props.log }}
                key={idx}
                className={`transition duration-300 ease-in-out pageButton hover:scale-110 ${
                  props.page === pageNum ? "selectedPage" : null
                }`}
              >
                <span>{pageNum}</span>
              </Link>
            ))}
          </div>
          {props.page < props.totalPage && (
            <Link
              to={`${props.pathName}?page=${props.page + 1}${
                isType ? `&type=${props.type}` : ""
              }${isSearching ? `&keyword=${props.keyword}` : ""}${
                isDelete ? `&delYn=Y` : ""
              }`}
              state={{ log: props.log }}
              className="transition duration-300 ease-in-out pageButton hover:scale-110"
            >
              <FaAngleRight size={20} />
            </Link>
          )}
          {props.page < props.totalPage && (
            <Link
              to={`${props.pathName}?page=${props.totalPage}${
                isType ? `&type=${props.type}` : ""
              }${isSearching ? `&keyword=${props.keyword}` : ""}${
                isDelete ? `&delYn=Y` : ""
              }`}
              state={{ log: props.log }}
              className="transition duration-300 ease-in-out pageButton hover:scale-110 hidden xl:block"
            >
              <FaAngleDoubleRight size={20} />
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Pagenate;
