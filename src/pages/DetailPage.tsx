import { useState, useEffect } from "react";
import DetailTitle from "../components/detail/DetailTitle";

export default function DetailPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // TODO: 요청을 보내지 않고, 전역 상태관리에 있는 post 상태에서 값을 찾아서 화면을 그리세요
  useEffect(() => {}, [loading, error]);

  if (error) {
    return <div>에러발생</div>;
  }

  return <DetailTitle />;
}
