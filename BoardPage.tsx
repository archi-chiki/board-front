import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import "../styles/board.css";

interface Props {
  id: number;
  subject: string;
  author: string;
  createdAt: string;
  views: number;
  likes: number;
}

export const BoardPage = () => {
  const [posts, setPosts] = useState<Props[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:9000/board", {
        method: "GET",
      }); // 예제 API
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      console.log(data);

      // 데이터 구조 변환 (예제에 맞게 변환)
      const transformedData: Props[] = data.slice(0, 10).map((item: any) => ({
        id: item.id,
        subject: item.subject,
        author: item.author.name, // API에서 제공되지 않는 값은 임의로 설정
        createdAt: item.createdAt,
        views: Math.floor(Math.random() * 1000), // 임의의 조회수 생성
        likes: Math.floor(Math.random() * 100), // 임의의 추천수 생성
      }));

      setPosts(transformedData); // 상태 업데이트
    } catch (error) {
      setError((error as Error).message); // 에러 메시지 저장
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>; // 로딩 중일 때 표시
  if (error) return <p>Error: {error}</p>; // 에러 발생 시 표시

  return (
    <div>
      <section className="board-content">
        {/* 글쓰기 버튼 */}
        <div className="board-header">
          <h2>게시판</h2>
          <a href="/board/write">
            <button className="function-btn write">글쓰기</button>
          </a>
        </div>

        {/* 게시글 목록 테이블 */}
        <table className="board-table">
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
          <tbody>
            {postData.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <a href={`/board/${post.id}`}>{post.subject}</a>
                </td>
                <td>{post.author.name}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
