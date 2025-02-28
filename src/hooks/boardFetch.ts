import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/axios-instance";
import { useData } from "../provider/DataProvider";

export const useBoradFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { data, setData } = useData(); // 얘는 왜 객체로만 선언되지?

  const [count, setCount] = useState<number>(0);
  const [urlBoard, setUrlboard] = useState("/board");

  const fetchData = useCallback(async () => {
    console.log("-0----------랜더링");

    setCount((prev) => {
      const updatedState = prev + 1;
      return updatedState;
    });
    try {
      const response = await apiClient.get(urlBoard);

      // 데이터 확인
      setData(response.data);
    } catch (error) {
      if (error) {
        setError(true);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(count);
    setLoading(true);

    /*
    fetchData()에 useCallBack()을 적용한다고 가정했을 때,
    url을 인자로 넘기고 의존성 배열에 url을 정의하면,
    한 번 호출했었던 url에 대한 요청이 재발생되지 않는게 맞는겁니까!?
    */

    setInterval(() => fetchData(), 1000);
  }, []);

  return { data, loading, error };
};
