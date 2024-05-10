import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { MdOutlineClose } from "react-icons/md";

function AddManager(props) {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [useStatus, setUseStatus] = useState("Y");

  useEffect(() => {
    resetIt();
    getInfo(props.managerInfo);
    //eslint-disable-next-line
  }, [props.managerInfo]);

  const resetIt = () => {
    setUserId("");
    setUserPwd("");
    setUserName("");
    setPhone("");
    setUseStatus("");
  };

  const getInfo = async info => {
    const doc = info;
    if (doc) {
      setUserId(doc.userId || "");
      setUserName(doc.userName || "");
      setPhone(doc.phone || "");
      setUseStatus(doc.useStatus || "");
    }
  };

  const submit = async () => {
    let apiUrl = "/api/v1/common/manager/add";
    if (props.addType === "edit") {
      apiUrl = "/api/v1/common/manager/upt";
    }
    if (props.addType === "pwd") {
      apiUrl = "/api/v1/common/manager/pwd/upt";
    }

    let data;
    if (props.addType === "new") {
      data = {
        userId: userId,
        userPwd: userPwd,
        userName: userName,
        phone: phone,
      };
    }
    if (props.addType === "edit") {
      data = {
        userId: userId,
        userName: userName,
        phone: phone,
        useStatus: useStatus,
      };
    }
    if (props.addType === "pwd") {
      data = {
        userId: userId,
        userPwd: userPwd,
      };
    }

    if (props.addType === "new") {
      await axiosInstance
        .post(apiUrl, data, {
          headers: { Authorization: props.user.accessToken },
        })
        .then(res => {
          alert(res.data.message);
          if (res.data.code === "C000") {
            props.getAccountList();
            setUserId("");
            setUserPwd("");
            setUserName("");
            setPhone("");
            props.setModalOn(false);
            props.setManagerInfo(null);
            props.setAddType("");
          }
        })
        .catch(e => console.log(e));
    } else {
      await axiosInstance
        .patch(apiUrl, data, {
          headers: { Authorization: props.user.accessToken },
        })
        .then(res => {
          alert(res.data.message);
          if (res.data.code === "C000") {
            props.getAccountList();
            setUserId("");
            setUserPwd("");
            setUserName("");
            setPhone("");
            props.setModalOn(false);
            props.setManagerInfo(null);
            props.setAddType("");
          }
        })
        .catch(e => console.log(e));
    }
  };
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit min-w-[480px] h-auto p-4 bg-white rounded-lg z-10 flex flex-col justify-start gap-y-2">
        <div className="flex justify-between mb-3">
          <h4 className="text-xl font-neoextra">
            {props.addType === "new"
              ? "파트너 등록"
              : props.addType === "edit"
              ? "파트너 정보수정"
              : "파트너 비밀번호 수정"}
          </h4>
          <button
            className="w-fit h-fit text-xl"
            onClick={() => {
              props.setModalOn(false);
              props.setManagerInfo(null);
            }}
          >
            <MdOutlineClose />
          </button>
        </div>
        {props.addType !== "" ? (
          <>
            <div className="flex flex-col justify-start gap-y-2">
              <div
                className={`flex flex-row justify-start gap-x-2 ${
                  props.addType === "pwd" && "hidden"
                }`}
              >
                <label htmlFor="userId" className="w-[120px] p-2 text-right">
                  아이디
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="userId"
                    className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full rounded"
                    value={userId}
                    placeholder="아이디 입력"
                    onChange={e => setUserId(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div
                className={`flex flex-row justify-start gap-x-2 ${
                  props.addType === "edit" && "hidden"
                }`}
              >
                <label htmlFor="userPwd" className="w-[120px] p-2 text-right">
                  비밀번호
                </label>
                <div className="w-full">
                  <input
                    type="password"
                    id="userPwd"
                    className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full rounded"
                    value={userPwd}
                    placeholder="비밀번호 입력"
                    onChange={e => setUserPwd(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div
                className={`flex flex-row justify-start gap-x-2 ${
                  props.addType === "pwd" && "hidden"
                }`}
              >
                <label htmlFor="userName" className="w-[120px] p-2 text-right">
                  파트너 이름
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="userName"
                    className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full rounded"
                    value={userName}
                    placeholder="파트너 이름 입력"
                    onChange={e => setUserName(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div
                className={`flex flex-row justify-start gap-x-2 ${
                  props.addType === "pwd" && "hidden"
                }`}
              >
                <label htmlFor="phone" className="w-[120px] p-2 text-right">
                  연락처
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="phone"
                    className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full rounded"
                    value={phone}
                    placeholder="연락처 - 없이 입력"
                    onChange={e => setPhone(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div
                className={`flex flex-row justify-start gap-x-2 ${
                  props.addType !== "edit" && "hidden"
                }`}
              >
                <label htmlFor="useStatus" className="w-[120px] p-2 text-right">
                  사용여부
                </label>
                <div className="w-full">
                  <select
                    id="useStatus"
                    className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full rounded"
                    onChange={e => setUseStatus(e.currentTarget.value)}
                    value={useStatus}
                  >
                    <option value="N">미사용</option>
                    <option value="Y">사용</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-2">
                <button
                  className="p-2 text-white bg-indigo-500 hover:bg-indigo-700 col-span-2"
                  onClick={() => submit()}
                >
                  저장하기
                </button>
                <button
                  className="p-2 text-white bg-gray-700 hover:bg-gray-500"
                  onClick={() => {
                    props.setModalOn(false);
                    props.setManagerInfo(null);
                    props.setAddType("");
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div
        className="w-screen h-screen bg-black bg-opacity-60 fixed inset-0 z-0 overflow-hidden"
        onClick={() => {
          props.setModalOn(false);
          props.setManagerInfo(null);
          props.setAddType("");
        }}
      />
    </>
  );
}

export default AddManager;
