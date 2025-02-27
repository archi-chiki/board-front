import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/axios-instance";
import { useData } from "../provider/DataProvider";

export const useBoradFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { data, setData } = useData(); // 얘는 왜 객체로만 선언되지?

  useEffect(() => {
    setLoading(true);

    /*
    fetchData()에 useCallBack()을 적용한다고 가정했을 때,
    url을 인자로 넘기고 의존성 배열에 url을 정의하면,
    한 번 호출했었던 url에 대한 요청이 재발생되지 않는게 맞는겁니까!?
    */
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/board");

        // 데이터 확인
        console.log(response);
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
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
