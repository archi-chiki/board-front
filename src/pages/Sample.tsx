import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  subject: string;
  createdAt: string;
  content: string;
  author: {
    name: string;
  };
}

interface PageInfo {
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  endCursor: number | null;
}

const PaginationExample = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 현재 페이지 게시물
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null); // 페이지 정보
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  // 서버로부터 데이터 가져오기
  const fetchPosts = async (page: number) => {
    try {
      const response = await axios.get("http://localhost:9000/board", {
        params: { page },
      });

      setPosts(response.data.posts); // 게시물 데이터 설정
      setPageInfo(response.data.pageInfo); // 페이지 정보 설정
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 컴포넌트 마운트 시 첫 번째 페이지 데이터 가져오기
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.subject}</h3>
            <p>{post.content}</p>
            <small>작성자: {post.author.name}</small>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 UI */}
      {pageInfo && (
        <div style={{ marginTop: "20px" }}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            이전
          </button>

          {/* 페이지 번호 표시 */}
          {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                fontWeight: currentPage === page ? "bold" : "normal",
              }}
            >
              {page}
            </button>
          ))}

          <button
            disabled={!pageInfo.hasNextPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationExample;
