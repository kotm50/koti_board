import React from "react";
import dompurify from "dompurify";

function MemoModal(props) {
  const sanitizer = dompurify.sanitize;
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-5 w-fit h-fit bg-white rounded-lg drop-shadow-xl modalWrap min-w-[240px] min-h-[100px] flex flex-col justify-start gap-y-5">
        <h3 className="text-lg font-bold select-none">메모 전체보기</h3>
        <div
          className="text-left"
          dangerouslySetInnerHTML={{
            __html: sanitizer(props.memo),
          }}
        />
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-lg select-none"
          onClick={() => props.setModalOn(false)}
        >
          창닫기
        </button>
      </div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen overflow-hidden modalBg bg-black bg-opacity-50"
        onClick={() => props.setModalOn(false)}
      ></div>
    </>
  );
}

export default MemoModal;
