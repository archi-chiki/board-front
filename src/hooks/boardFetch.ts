import { usePage } from "./../provider/PageProvider";
import { useState, useEffect } from "react";
import apiClient from "../api/axios-instance";
import { useData } from "../provider/DataProvider";

export const useBoardFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const { data, setData } = useData();
  const { currentPage } = usePage();

  const fetchData = async () => {
    console.log(`선택한 페이지는 ${currentPage}입니다.`);
    try {
      const response = await apiClient.get(url, {
        params: {
          page: currentPage,
        },
      });

      setPageCount(response.data.pageInfo.totalPages);
      setData(response.data.posts);
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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return { data, pageCount, loading, error };
};
