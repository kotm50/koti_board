import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import axiosInstance from "../../Api/axiosInstance";

function InputCompany(props) {
  const [tier, setTier] = useState(""); //등급
  const [adNum, setAdNum] = useState(""); //고객사번호
  const [gubun, setGubun] = useState(""); //구분값
  const [channel, setChannel] = useState(""); //채널
  const [compName, setCompName] = useState(""); //고객사명
  const [compBranch, setCompBranch] = useState(""); //지점명
  const [manager1, setManager1] = useState(""); //담당자1
  const [phone1, setPhone1] = useState(""); //담당자1 연락처
  const [manager2, setManager2] = useState(""); //담당자2
  const [phone2, setPhone2] = useState(""); //담당자2 연락처
  const [province, setProvince] = useState(""); //근무지 시/도
  const [city, setCity] = useState(""); //근무지 시/군/구
  const [address, setAddress] = useState(""); //근무지 상세주소
  const [bigo, setBigo] = useState(""); //비고

  const [gubunList, setGubunList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [tierList, setTierList] = useState([]);

  useEffect(() => {
    resetIt();
    getInfo(props.compInfo);
    //eslint-disable-next-line
  }, [props.compInfo]);

  useEffect(() => {
    if (gubun !== "") getChannel(gubun);
    //eslint-disable-next-line
  }, [gubun]);

  const getInfo = async info => {
    const doc = info;
    await getTierList();
    await getCategory();
    if (doc) {
      setTier(doc.tierCode || "");
      setAdNum(doc.adNum || "");
      setGubun(doc.gubun || "");
      setChannel(doc.channel || "");
      setCompName(doc.compName || "");
      setCompBranch(doc.compBranch || "");
      setManager1(doc.manager1 || "");
      setPhone1(doc.phone1 || "");
      setManager2(doc.manager2 || "");
      setPhone2(doc.phone2 || "");
      setProvince(doc.province || "");
      setCity(doc.city || "");
      setAddress(doc.address || "");
      setBigo(doc.bigo || "");
    }
  };

  const getChannel = async category => {
    const data = {
      category: category,
      useYn: "Y",
    };
    await axiosInstance
      .post("/api/v1/comp/get/comlist", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        setChannelList(res.data.commList);
      })
      .catch(e => console.log(e));
  };

  const resetIt = () => {
    setTier("");
    setAdNum("");
    setGubun("");
    setChannel("");
    setCompName("");
    setCompBranch("");
    setManager1("");
    setPhone1("");
    setManager2("");
    setPhone2("");
    setProvince("");
    setCity("");
    setAddress("");
    setBigo("");

    getTierList();
  };

  const getCategory = async () => {
    const data = {
      category: "GU",
      useYn: "Y",
    };
    await axiosInstance
      .post("/api/v1/comp/get/comlist", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        setGubunList(res.data.commList);
      })
      .catch(e => console.log(e));
  };

  const getTierList = async () => {
    await axiosInstance
      .post("/api/v1/ad/get/tier/list", null, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        setTierList(res.data.tierList);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const submit = async () => {
    const data = {
      adNum: adNum,
      compName: compName,
      compBranch: compBranch,
      tierCode: tier,
      gubun: gubun,
      channel: channel,
      manager1: manager1,
      phone1: phone1,
      manager2: manager2,
      phone2: phone2,
      province: province,
      city: city,
      address: address,
      bigo: bigo,
    };
    console.log(data);
    await axiosInstance
      .post("/api/v1/ad/add/comp", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        if (res.data.code === "C000") {
          props.setModalOn(false);
          props.setCompInfo(null);
          props.getList(props.page, props.keyword);
        } else {
          return alert(res.data.massege);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const modify = async () => {
    const data = {
      compCode: props.compInfo.compCode,
      adNum: adNum,
      compName: compName,
      compBranch: compBranch,
      tierCode: tier,
      gubun: gubun,
      channel: channel,
      manager1: manager1,
      phone1: phone1,
      manager2: manager2,
      phone2: phone2,
      province: province,
      city: city,
      address: address,
      bigo: bigo,
    };
    console.log(data);
    await axiosInstance
      .patch("/api/v1/ad/upt/comp", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        if (res.data.code === "C000") {
          props.setModalOn(false);
          props.setCompInfo(null);
          props.getList(props.page, props.keyword);
        } else {
          return alert(res.data.massege);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-auto p-4 bg-white rounded-lg z-10 flex flex-col justify-start gap-y-2">
        <div className="flex justify-between mb-3">
          <h4 className="text-xl font-neoextra">
            {props.compInfo ? "고객사 수정" : "고객사 등록"}
          </h4>
          <button
            className="w-fit h-fit text-xl"
            onClick={() => {
              props.setModalOn(false);
              props.setCompInfo(null);
            }}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="tier"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            등급
          </label>
          <select
            id="tier"
            className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
            onChange={e => setTier(e.currentTarget.value)}
            value={tier}
          >
            <option value="">등급선택</option>
            {tierList && tierList.length > 0 ? (
              <>
                {tierList.map((tier, idx) => (
                  <option key={idx} value={tier.tierCode}>
                    {tier.tierName}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </div>
        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="adNum"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            고객사번호
          </label>
          <input
            id="adNum"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={adNum}
            placeholder="고객사 번호를 입력하세요"
            onChange={e => setAdNum(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="gubun"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            구분
          </label>
          <select
            id="gubun"
            className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
            onChange={e => setGubun(e.currentTarget.value)}
            value={gubun}
          >
            <option value="">구분값 선택</option>
            {gubunList && gubunList.length > 0 ? (
              <>
                {gubunList.map((cat, idx) => (
                  <option key={idx} value={cat.useValue}>
                    {cat.useValue}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </div>
        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="channel"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            채널
          </label>
          <select
            id="channel"
            className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
            onChange={e => setChannel(e.currentTarget.value)}
            value={channel}
          >
            <option value="">채널선택</option>
            {channelList && channelList.length > 0 ? (
              <>
                {channelList.map((chn, idx) => (
                  <option key={idx} value={chn.useValue}>
                    {chn.useValue}
                  </option>
                ))}
              </>
            ) : (
              <option value="">구분값을 먼저 골라주세요</option>
            )}
          </select>
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="compName"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            고객사명
          </label>
          <input
            id="compName"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={compName}
            placeholder="고객사명을 입력하세요"
            onChange={e => setCompName(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="compBranch"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            지점명
          </label>
          <input
            id="compBranch"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={compBranch}
            placeholder="고객사 지점명을 입력하세요"
            onChange={e => setCompBranch(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="manager1"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            담당자1
          </label>
          <input
            id="manager1"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={manager1}
            placeholder="담당자 이름을 입력하세요"
            onChange={e => setManager1(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="phone1"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            연락처
          </label>
          <input
            id="phone1"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={phone1}
            placeholder="담당자 연락처를 입력하세요"
            onChange={e => setPhone1(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="manager2"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            담당자2
          </label>
          <input
            id="manager2"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={manager2}
            placeholder="다른 담당자가 있으면 입력하세요"
            onChange={e => setManager2(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="phone2"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            연락처
          </label>
          <input
            id="phone2"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={phone2}
            placeholder="담당자2의 연락처를 입력하세요"
            onChange={e => setPhone2(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="province"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            주소지 시/도
          </label>
          <input
            id="province"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={province}
            placeholder="주소지 시/도를 입력하세요(ex: 서울시, 경기도 등)"
            onChange={e => setProvince(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="city"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            시/군/구
          </label>
          <input
            id="city"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={city}
            placeholder="주소지 시/군/구를 입력하세요(ex:성남시, 양평군, 종로구 등)"
            onChange={e => setCity(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="address"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            상세주소
          </label>
          <input
            id="address"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={address}
            placeholder="나머지 주소를 입력하세요"
            onChange={e => setAddress(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-start gap-x-2">
          <label
            htmlFor="bigo"
            className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
          >
            비고
          </label>
          <input
            id="bigo"
            type="text"
            className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
            value={bigo}
            placeholder="그 외 기록할 내용을 간단하게 기록"
            onChange={e => setBigo(e.currentTarget.value)}
          />
        </div>
        {props.compInfo ? (
          <button
            className="w-full bg-green-600 text-white p-3 rounded-lg"
            onClick={() => modify()}
          >
            고객사 정보수정
          </button>
        ) : (
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
            onClick={() => submit()}
          >
            고객사 추가하기
          </button>
        )}
      </div>
      <div
        className="w-screen h-screen bg-black bg-opacity-60 fixed inset-0 z-0 overflow-hidden"
        onClick={() => {
          props.setModalOn(false);
          props.setCompInfo(null);
        }}
      />
    </>
  );
}

export default InputCompany;
