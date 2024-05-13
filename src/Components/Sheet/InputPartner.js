import { useState, useEffect } from "react";
import axiosInstance from "../../Api/axiosInstance";

function InputPartner(props) {
  const [partnerList, setPartnerList] = useState([]);
  const [loadMsg, setLoadMsg] = useState("파트너를 불러오고 있습니다");

  useEffect(() => {
    getPartnerList();
    //eslint-disable-next-line
  }, []);

  const getPartnerList = async () => {
    setPartnerList([]);
    setLoadMsg("검색 중 입니다...");
    const data = {
      page: 1,
      size: 100,
    };
    await axiosInstance
      .post("/api/v1/common/manager/list", data, {
        headers: {
          Authorization: props.user.accessToken,
        },
      })
      .then(async res => {
        console.log(res);
        if (!res.data.userList || res.data.userList.length === 0) {
          setLoadMsg("검색 실패");
        }
        setPartnerList(res.data.userList ?? []);
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  };
  return (
    <div className="p-2 py-2 bg-gray-100 min-w-[480px] w-full max-h-[300px] overflow-auto">
      {partnerList.length > 0 ? (
        <div className="">
          <table className="w-full bg-white">
            <thead>
              <tr className=" bg-blue-100">
                <td className="p-2 text-center truncate">파트너명</td>
                <td className="p-2 text-center truncate">파트너ID</td>
                <td className="p-2 text-center truncate">연락처</td>
                <td className="p-1 text-center">등록</td>
              </tr>
            </thead>
            <tbody>
              {partnerList.slice(0, 30).map((part, idx) => (
                <tr key={idx}>
                  <td className="p-2 text-center truncate">{part.userName}</td>
                  <td className="p-2 text-center truncate">{part.userId}</td>
                  <td className="p-2 text-center truncate">{part.phone}</td>
                  <td className="p-2 text-center">
                    <button
                      className="py-1 px-2 bg-green-500 text-white hover:bg-green-700 truncate"
                      onClick={() => {
                        props.setPartnerId(part.userId);
                        props.setPartnerName(part.userName);
                        props.setSearchPartner(false);
                      }}
                    >
                      등록
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="m-auto text-center h-full py-5">{loadMsg}</div>
      )}
      <div className="grid grid-cols-2 gap-x-2">
        <button
          className="sticky bottom-0 min-w-fit p-2 w-full bg-blue-500 hover:bg-blue-700 text-white rounded mb-2"
          onClick={() => {
            props.setSearchPartner(false);
          }}
        >
          창 닫기(내용유지)
        </button>
        <button
          className="sticky bottom-0 min-w-fit p-2 w-full bg-red-500 hover:bg-red-700 text-white rounded mb-2"
          onClick={() => {
            props.setPartnerId("");
            props.setPartnerName("");
            props.setSearchPartner(false);
          }}
        >
          창 닫기(내용삭제)
        </button>
      </div>
    </div>
  );
}

export default InputPartner;
