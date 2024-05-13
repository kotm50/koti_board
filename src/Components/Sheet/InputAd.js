import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import InputCompanyList from "./InputCompanyList";
import axiosInstance from "../../Api/axiosInstance";
import InputPartner from "./InputPartner";

function InputAd(props) {
  const [progCode, setProgCode] = useState("");
  const [compCode, setCompCode] = useState("");
  const [compName, setCompName] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [heavenLogo, setHeavenLogo] = useState("");
  const [monLogo, setMonLogo] = useState("");
  const [adStartDate, setAdStartDate] = useState("");
  const [adEndDate, setAdEndDate] = useState("");
  const [heavenLocalDay, setHeavenLocalDay] = useState("");
  const [heavenJumpDay, setHeavenJumpDay] = useState("");
  const [monLocalDay, setMonLocalDay] = useState("");
  const [monJumpDay, setMonJumpDay] = useState("");
  const [heavenLocalAccCount, setHeavenLocalAccCount] = useState("");
  const [heavenJumpAccCount, setHeavenJumpAccCount] = useState("");
  const [monLocalAccCount, setMonLocalAccCount] = useState("");
  const [monJumpAccCount, setMonJumpAccCount] = useState("");
  const [registeredStatus, setRegisteredStatus] = useState("N");
  const [careService, setCareService] = useState("N");
  const [dualType, setDualType] = useState("");
  const [intvPay, setIntvPay] = useState("");
  const [bigo, setBigo] = useState("");

  const [searchComp, setSearchComp] = useState(false);

  const [commList, setCommList] = useState([]);

  const [partnerId, setPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [searchPartner, setSearchPartner] = useState(false);

  useEffect(() => {
    resetIt();
    getInfo(props.adInfo);
    //eslint-disable-next-line
  }, [props.adInfo]);

  const resetIt = () => {
    setProgCode("");
    setPartnerName("");
    setPartnerId("");
    setCompCode("");
    setCompName("");
    setPaymentOption("");
    setHeavenLogo("");
    setMonLogo("");
    setAdStartDate("");
    setAdEndDate("");
    setHeavenLocalDay("");
    setHeavenJumpDay("");
    setMonLocalDay("");
    setMonJumpDay("");
    setHeavenLocalAccCount("");
    setHeavenJumpAccCount("");
    setMonLocalAccCount("");
    setMonJumpAccCount("");
    setRegisteredStatus("");
    setCareService("");
    setDualType("");
    setIntvPay("");
    setBigo("");
  };

  const getInfo = async info => {
    const doc = info;
    await getCommList("DU", "Y");
    if (doc) {
      setProgCode(doc.progCode || "");
      setPartnerId(doc.userId || "");
      setPartnerName(doc.userName || "");
      setCompCode(doc.compCode || "");
      setCompName(doc.compName ? `${doc.compName} ${doc.compBranch}` : "");
      setPaymentOption(doc.paymentOption || "");
      setHeavenLogo(doc.heavenLogo || "");
      setMonLogo(doc.monLogo || "");
      setAdStartDate(doc.adStartDate || "");
      setAdEndDate(doc.adEndDate || "");
      setHeavenLocalDay(doc.heavenLocalDay || "");
      setHeavenJumpDay(doc.heavenJumpDay || "");
      setMonLocalDay(doc.monLocalDay || "");
      setMonJumpDay(doc.monJumpDay || "");
      setHeavenLocalAccCount(doc.heavenLocalAccCount || "");
      setHeavenJumpAccCount(doc.heavenJumpAccCount || "");
      setMonLocalAccCount(doc.monLocalAccCount || "");
      setMonJumpAccCount(doc.monJumpAccCount || "");
      setRegisteredStatus(doc.registeredStatus || "N");
      setCareService(doc.careService || "미이용");
      setDualType(doc.dualType || "기본");
      setIntvPay(doc.intvPay || "");
      setBigo(doc.bigo || "");
    }
  };

  const submit = async () => {
    const data = {
      compCode: compCode,
      paymentOption: paymentOption,
      heavenLogo: heavenLogo,
      monLogo: monLogo,
      adStartDate: adStartDate,
      adEndDate: adEndDate,
      heavenLocalDay: heavenLocalDay,
      heavenJumpDay: heavenJumpDay,
      monLocalDay: monLocalDay,
      monJumpDay: monJumpDay,
      heavenLocalAccCount: heavenLocalAccCount,
      heavenJumpAccCount: heavenJumpAccCount,
      monLocalAccCount: monLocalAccCount,
      monJumpAccCount: monJumpAccCount,
      registeredStatus: registeredStatus || "N",
      careService: careService || "미이용",
      dualType: dualType || "기본",
      intvPay: intvPay,
      bigo: bigo,
      userId: partnerId,
    };

    await axiosInstance
      .post("/api/v1/ad/add/prog", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        console.log(res);
        if (res.data.code === "C000") {
          props.setModalOn(false);
          props.setAdInfo(null);
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
      progCode: progCode,
      compCode: compCode,
      paymentOption: paymentOption,
      heavenLogo: heavenLogo,
      monLogo: monLogo,
      adStartDate: adStartDate,
      adEndDate: adEndDate,
      heavenLocalDay: heavenLocalDay,
      heavenJumpDay: heavenJumpDay,
      monLocalDay: monLocalDay,
      monJumpDay: monJumpDay,
      heavenLocalAccCount: heavenLocalAccCount,
      heavenJumpAccCount: heavenJumpAccCount,
      monLocalAccCount: monLocalAccCount,
      monJumpAccCount: monJumpAccCount,
      registeredStatus: registeredStatus || "N",
      careService: careService || "미이용",
      dualType: dualType || "기본",
      intvPay: intvPay,
      bigo: bigo,
      userId: partnerId,
    };
    await axiosInstance
      .patch("/api/v1/ad/upt/prog", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        if (res.data.code === "C000") {
          props.setModalOn(false);
          props.setAdInfo(null);
          props.getList(props.page, props.keyword);
        } else {
          return alert(res.data.massege);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getCommList = async (c, u) => {
    let data = {
      useYn: u,
    };
    if (c !== "") {
      data.category = c;
    }
    await axiosInstance
      .post("/api/v1/comp/get/comlist", data, {
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        setCommList(res.data.commList || []);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProg = async code => {
    const really = window.confirm("삭제하면 복구할 수 없습니다\n진행할까요?");
    if (!really) {
      return false;
    }
    const data = {
      progCode: code,
    };
    await axiosInstance
      .delete("/api/v1/ad/del/prog", {
        data: data,
        headers: { Authorization: props.user.accessToken },
      })
      .then(res => {
        if (res.data.code === "C000") {
          alert(res.data.message);
          props.setModalOn(false);
          props.setAdInfo(null);
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit min-w-[480px] h-auto p-4 bg-white rounded-lg z-10 ">
        <div className="flex justify-between mb-3">
          <h4 className="text-xl font-neoextra">
            {props.adInfo ? "광고 수정" : "광고 등록"}
          </h4>
          <button
            className="w-fit h-fit text-xl"
            onClick={() => {
              props.setModalOn(false);
              props.setAdInfo(null);
            }}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className="flex flex-row justify-start gap-x-2">
          <div className="flex flex-col justify-start gap-y-2">
            <div className="flex justify-start gap-x-2">
              <label
                htmlFor="compCode"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                고객사
              </label>
              {compName === "" ? (
                <button
                  className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                  onClick={() => setSearchComp(!searchComp)}
                >
                  고객사 찾기
                </button>
              ) : (
                <input
                  id="compCode"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={compName}
                  placeholder="클릭하여 고객사를 검색하세요"
                  onFocus={() => setSearchComp(true)}
                  readOnly
                />
              )}
            </div>

            <div className="flex justify-start gap-x-2">
              <label
                htmlFor="partnerName"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                담당자
              </label>
              {partnerName === "" ? (
                <button
                  className="w-full p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
                  onClick={() => setSearchPartner(!searchPartner)}
                >
                  채용파트너 찾기
                </button>
              ) : (
                <input
                  id="partnerName"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={partnerName}
                  placeholder="클릭하여 고객사를 검색하세요"
                  onFocus={() => setSearchPartner(true)}
                  readOnly
                />
              )}
            </div>
            <div className="flex justify-start gap-x-2">
              <label
                htmlFor="paymentOption"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                결제방식
              </label>
              <input
                id="paymentOption"
                type="text"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={paymentOption}
                placeholder="결제방식을 입력하세요"
                onChange={e => setPaymentOption(e.currentTarget.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="heavenLogo"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  천국로고
                </label>
                <input
                  id="heavenLogo"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={heavenLogo}
                  placeholder="알바천국 로고"
                  onChange={e => setHeavenLogo(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="monLogo"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  몬로고
                </label>
                <input
                  id="monLogo"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={monLogo}
                  placeholder="알바몬 로고"
                  onChange={e => setMonLogo(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="adStartDate"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  시작일
                </label>
                <input
                  id="adStartDate"
                  type="date"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={adStartDate}
                  placeholder="광고 시작일을 입력하세요"
                  onChange={e => setAdStartDate(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="adEndDate"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  종료일
                </label>
                <input
                  id="adEndDate"
                  type="date"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={adEndDate}
                  placeholder="광고 종료일을 입력하세요"
                  onChange={e => setAdEndDate(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="heavenLocalDay"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  천국로컬
                </label>
                <input
                  id="heavenLocalDay"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={heavenLocalDay}
                  placeholder="유료상품(천국로컬)"
                  onChange={e => setHeavenLocalDay(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="heavenJumpDay"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  천국줄
                </label>
                <input
                  id="heavenJumpDay"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={heavenJumpDay}
                  placeholder="유료상품(천국줄)"
                  onChange={e => setHeavenJumpDay(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="monLocalDay"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  몬로컬
                </label>
                <input
                  id="monLocalDay"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={monLocalDay}
                  placeholder="유료상품(몬로컬)"
                  onChange={e => setMonLocalDay(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="monJumpDay"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  몬줄
                </label>
                <input
                  id="monJumpDay"
                  type="text"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={monJumpDay}
                  placeholder="유료상품(몬줄)"
                  onChange={e => setMonJumpDay(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="heavenLocalAccCount"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  천국로컬누적
                </label>
                <input
                  id="heavenLocalAccCount"
                  type="number"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={heavenLocalAccCount}
                  placeholder="유료상품(천국로컬) 누적"
                  onChange={e => setHeavenLocalAccCount(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="heavenJumpAccCount"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  천국줄누적
                </label>
                <input
                  id="heavenJumpAccCount"
                  type="number"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={heavenJumpAccCount}
                  placeholder="유료상품(천국줄) 누적"
                  onChange={e => setHeavenJumpAccCount(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="monLocalAccCount"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  몬로컬누적
                </label>
                <input
                  id="monLocalAccCount"
                  type="number"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={monLocalAccCount}
                  placeholder="유료상품(몬로컬) 누적"
                  onChange={e => setMonLocalAccCount(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="monJumpAccCount"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  몬줄누적
                </label>
                <input
                  id="monJumpAccCount"
                  type="number"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={monJumpAccCount}
                  placeholder="유료상품(몬줄) 누적"
                  onChange={e => setMonJumpAccCount(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="registeredStatus"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  광고등록여부
                </label>
                <select
                  id="registeredStatus"
                  className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
                  onChange={e => setRegisteredStatus(e.currentTarget.value)}
                  value={registeredStatus}
                >
                  <option value="N">등록전</option>
                  <option value="S">등록중</option>
                  <option value="Y">등록완료</option>
                </select>
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="careService"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  케어서비스
                </label>
                <select
                  id="careService"
                  className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
                  onChange={e => setCareService(e.currentTarget.value)}
                  value={careService}
                >
                  <option value="">이용안함</option>
                  <option value="위촉케어">위촉케어</option>
                  <option value="면접케어">면접케어</option>
                  <option value="면접+위촉">면접+위촉</option>
                </select>
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="dualType"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  광고수
                </label>
                <select
                  id="dualType"
                  className="p-1 border bg-white focus:border-gray-500 uppercase w-full"
                  onChange={e => setDualType(e.currentTarget.value)}
                  value={dualType}
                >
                  <option value="">광고갯수</option>
                  {commList && commList.length > 0 && (
                    <>
                      {commList.map((comm, idx) => (
                        <option key={idx} value={comm.useValue}>
                          {comm.useValue}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div className="flex justify-start gap-x-2">
                <label
                  htmlFor="intvPay"
                  className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
                >
                  면접비
                </label>
                <input
                  id="intvPay"
                  type="number"
                  className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                  value={intvPay}
                  placeholder="면접비"
                  onChange={e => setIntvPay(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex justify-start gap-x-2">
              <label
                htmlFor="bigo"
                className="p-2 text-nowrap text-right w-[10%] min-w-[100px]"
              >
                비고
              </label>
              <textarea
                id="bigo"
                className="p-2 border border-gray-300 hover:border-gray-500 focus:bg-gray-50 focus:border-gray-600 w-full"
                value={bigo}
                placeholder="비고"
                onChange={e => setBigo(e.currentTarget.value)}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-2">
              <button
                className="p-2 w-full bg-green-500 hover:bg-green-700 border border-green-500 hover:border-green-700 text-white rounded my-2 col-span-3"
                onClick={() => {
                  if (props.adInfo) {
                    modify();
                  } else {
                    submit();
                  }
                }}
              >
                광고 {props.adInfo ? "수정" : "등록"}
              </button>

              <button
                className="p-2 w-full bg-white hover:bg-gray-50 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded my-2"
                onClick={() => {
                  deleteProg(progCode);
                }}
              >
                광고 삭제
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start gap-y-2">
            {searchComp && (
              <InputCompanyList
                compCode={compCode}
                setCompCode={setCompCode}
                compName={compName}
                setCompName={setCompName}
                setSearchComp={setSearchComp}
                searchComp={searchComp}
                user={props.user}
              />
            )}

            {searchPartner && (
              <InputPartner
                partnerId={partnerId}
                setPartnerId={setPartnerId}
                partnerName={partnerName}
                setPartnerName={setPartnerName}
                setSearchPartner={setSearchPartner}
                searchComp={searchComp}
                user={props.user}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="w-screen h-screen bg-black bg-opacity-60 fixed inset-0 z-0 overflow-hidden"
        onClick={() => {
          props.setModalOn(false);
          props.setAdInfo(null);
        }}
      />
    </>
  );
}

export default InputAd;
