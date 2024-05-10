import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";

function TierList() {
  const thisLocation = useLocation();
  const user = useSelector(state => state.user);
  const [tierName, setTierName] = useState("");
  const [tierAlias, setTierAlias] = useState("");
  const [tierList, setTierList] = useState([]);
  const [tierCode, setTierCode] = useState("");

  useEffect(() => {
    getTierList();
    //eslint-disable-next-line
  }, [thisLocation]);

  const addTier = async () => {
    const url = "/api/v1/ad/add/tier";
    const data = {
      tierName: tierName,
      tierAliasName: tierAlias,
    };
    console.log(data);
    await axiosInstance
      .post(url, data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        console.log(res);
        getTierList();
        setTierCode("");
        setTierName("");
        setTierAlias("");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTier = async () => {
    const url = "/api/v1/ad/upt/tier";
    const data = {
      tierName: tierName,
      tierAliasName: tierAlias,
      tierCode: tierCode,
    };
    await axiosInstance
      .patch(url, data, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        console.log(res);
        getTierList();
        setTierCode("");
        setTierName("");
        setTierAlias("");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getTierList = async () => {
    await axiosInstance
      .post("/api/v1/ad/get/tier/list", null, {
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        console.log(res);
        setTierList(res.data.tierList);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const modifyTier = tier => {
    setTierName(tier.tierName);
    setTierAlias(tier.tierAliasName);
    setTierCode(tier.tierCode);
  };

  const deleteTier = async code => {
    const really = window.confirm("삭제하면 복구할 수 없습니다\n진행할까요?");
    if (!really) {
      return false;
    }
    const data = {
      tierCode: code,
    };
    await axiosInstance
      .delete("/api/v1/ad/del/tier", {
        data: data,
        headers: { Authorization: user.accessToken },
      })
      .then(res => {
        alert("삭제했습니다");
        getTierList();
        setTierCode("");
        setTierName("");
        setTierAlias("");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 px-2">
        <div>
          <div className="flex flex-col gap-y-2 bg-white p-4 h-fit rounded-lg drop-shadow">
            <h3 className="font-neoextra text-center">등급 추가</h3>
            <div className="flex gap-x-2">
              <label
                htmlFor="tierName"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                등급 입력명
              </label>
              <input
                id="tierName"
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={tierName}
                placeholder="등급 이니셜을 두글자 이상 쓰세요 (ex: 브론즈 > BR, 실버 > SI 등등)"
                onChange={e => setTierName(e.currentTarget.value)}
              />
            </div>
            <div className="flex gap-x-2 ">
              <label
                htmlFor="tierName"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                등급 표시값
              </label>
              <input
                id="tierName"
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={tierAlias}
                placeholder="화면에 표시할 등급명을 적어주세요"
                onChange={e => setTierAlias(e.currentTarget.value)}
              />
            </div>
            <div className="flex justify-center gap-x-2">
              {tierCode === "" ? (
                <button
                  className="w-full mx-auto p-2 bg-blue-600 text-white"
                  onClick={() => addTier()}
                >
                  추가하기
                </button>
              ) : (
                <button
                  className="w-full mx-auto p-2 bg-green-600 text-white"
                  onClick={() => updateTier()}
                >
                  수정하기
                </button>
              )}

              <button
                className="w-full mx-auto p-2 bg-gray-600 text-white"
                onClick={() => {
                  setTierName("");
                  setTierAlias("");
                  setTierCode("");
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 bg-white p-4 text-center rounded-lg drop-shadow">
          <h3 className="font-neoextra">등급 목록</h3>
          {tierList.length > 0 && (
            <>
              <div className="grid grid-cols-4 gap-x-1 bg-blue-100">
                <div className="p-2">등급명</div>
                <div className="p-2">등급이니셜</div>
                <div className="p-2">수정</div>
                <div className="p-2">삭제</div>
              </div>
              {tierList.map((tier, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-x-1">
                  <div className="p-2">{tier.tierName}</div>
                  <div className="p-2">{tier.tierAliasName}</div>
                  <div>
                    <button
                      className="bg-green-600 text-white p-2"
                      onClick={() => modifyTier(tier)}
                    >
                      수정
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      className="bg-red-600 text-white p-2"
                      onClick={() => deleteTier(tier.tierCode)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TierList;
