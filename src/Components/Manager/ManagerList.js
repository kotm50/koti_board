import React from "react";

function ManagerList(props) {
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
    <>
      <table className="w-full border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 text-center border">아이디</th>
            <th className="py-2 text-center border">이름</th>
            <th className="py-2 text-center border">연락처</th>
            <th className="py-2 text-center border">비밀번호 수정</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.accountList.map((acc, idx) => (
            <tr key={idx}>
              <td className="py-2 text-center border">{acc.userId}</td>
              <td className="py-2 text-center border">{acc.userName}</td>
              <td className="py-2 text-center border">
                {acc.phone ? getPhoneNum(acc.phone) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManagerList;
