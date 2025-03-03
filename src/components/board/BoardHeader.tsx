import React from "react";

const BoardHeader = () => {
  console.log("BoardHeader가 렌더링됨");
  return (
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>날짜</th>
        <th>조회수</th>
        <th>추천수</th>
      </tr>
    </thead>
  );
};

// 메모이제이션 처리
export default React.memo(BoardHeader);
