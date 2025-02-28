import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/detail.css";
import DetailTitle from "../components/detail/DetailTitle";
import { useBoard } from "../provider/BoardProvider";
import { useData } from "../provider/DataProvider";
import { Post } from "../components/board/BoardContent";

/* Context API 사용시 필요없음 */
// interface Post {
//   id: number;
//   subject: string;
//   content: string;
//   createdAt: string;
//   author: {
//     name: string;
//   };
// }

/* 만일 Props로 데이터를 전달한다면? */
// export const DetailPage = () => {
//   return (
//     <div className="container">
//       {/* DataTitle에 정의된 Props에 충족하는 데이터를 내려보내줘야 함 */}
//       <DetailTitle />
//     </div>
//   );
// };

export const DetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [post, setPost] = useState<Post | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);

  // TODO: 요청을 보내지 않고, 전역 상태관리에 있는 post 상태에서 값을 찾아서 화면을 그리세요

  useEffect(() => {}, [loading, error]);

  // 모달 열기
  const showDeleteModal = (): void => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeDeleteModal = (): void => {
    setIsModalOpen(false);
  };

  // 삭제 확인 처리
  const confirmDelete = (): void => {
    console.log("게시글이 삭제되었습니다.");
    // 실제 삭제 로직 (예: API 호출)을 추가하세요.
    closeDeleteModal();
  };

  if (error) {
    return <div>에러발생</div>;
  }

  return (
    <div className="container">
      <button
        style={{
          position: "fixed",
          left: 0,
        }}
        onClick={() => {
          setEditMode(true);
        }}
      >
        수정하기
      </button>
      {editMode && <>편집모드</>}
      {!loading && !editMode ? (
        <DetailTitle />
      ) : (
        <p>Loading...</p> // 데이터가 로드되기 전 로딩 메시지 표시
      )}

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <div id="deleteModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeDeleteModal}>
              &times;
            </span>
            <h2>삭제하시겠습니까?</h2>
            <p>삭제된 게시글은 복구할 수 없습니다.</p>
            <div className="modal-actions">
              <button className="confirm-delete" onClick={confirmDelete}>
                예
              </button>
              <button onClick={closeDeleteModal}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
