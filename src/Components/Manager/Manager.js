import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../Api/axiosInstance";
import AddManager from "./AddManager";

function Manager() {
  const user = useSelector(state => state.user);
  const [accountList, setAccountList] = useState([]);
  const [managerInfo, setManagerInfo] = useState(null);

  const [addType, setAddType] = useState("");

  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    getAccountList();
    //eslint-disable-next-line
  }, []);

  const getAccountList = async () => {
    setAccountList([]);
    await axiosInstance
      .post("/api/v1/common/manager/list", null, {
        headers: { Authorization: user.accessToken },
      })
      .then(async res => {
        setAccountList(res.data.userList || []);
      })
      .catch(e => console.log(e));
  };

  const getPhoneNum = phone => {
    // 입력된 전화번호 길이에 따라 다른 형식을 적용
    if (phone.length === 11) {
      // 13자리 숫자는 000-0000-0000 형식으로 변환
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (phone.length === 10) {
      // 12자리 숫자는 000-000-0000 형식으로 변환
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else {
      // 다른 길이의 숫자는 오류 메시지 반환
      return "번호오류";
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-between mb-4">
        <button
          className="py-2 px-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          onClick={() => {
            setModalOn(true);
          }}
        >
          파트너 등록
        </button>
      </div>
      {accountList && accountList.length > 0 ? (
        <table className="w-1/2 border-collapse text-sm drop-shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 text-center border">아이디</th>
              <th className="py-2 text-center border">이름</th>
              <th className="py-2 text-center border">연락처</th>
              <th className="py-2 text-center border" colSpan={2}>
                수정삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {accountList.map((doc, idx) => (
              <tr key={idx} className="bg-white">
                <td className="py-2 text-center border">{doc.userId}</td>
                <td className="py-2 text-center border">{doc.userName}</td>
                <td className="py-2 text-center border">
                  {doc.phone ? getPhoneNum(doc.phone) : "미입력"}
                </td>
                <td className="p-[1px] bg-white border text-center">
                  <button
                    className="py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white font-neoextra text-sm rounded"
                    onClick={() => {
                      setAddType("pwd");
                      setManagerInfo(doc);
                      setModalOn(true);
                    }}
                  >
                    비밀번호수정
                  </button>
                </td>
                <td className="p-[1px] bg-white border text-center">
                  <button
                    className="py-2 px-4 bg-green-600 hover:bg-green-500 text-white font-neoextra text-sm rounded"
                    onClick={() => {
                      setAddType("edit");
                      setManagerInfo(doc);
                      setModalOn(true);
                    }}
                  >
                    정보수정
                  </button>
                </td>

                <td className="p-[1px] bg-white border text-center hidden">
                  <button
                    className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-neoextra text-sm rounded"
                    onClick={() => console.log(doc)}
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
          className="py-2 px-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          onClick={() => {
            setAddType("new");
            setModalOn(true);
          }}
        >
          파트너 등록
        </button>
        {modalOn && (
          <AddManager
            user={user}
            getAccountList={getAccountList}
            managerInfo={managerInfo}
            setManagerInfo={setManagerInfo}
            addType={addType}
            setAddType={setAddType}
            setModalOn={setModalOn}
          />
        )}
      </div>
    </div>
  );
}

export default Manager;
