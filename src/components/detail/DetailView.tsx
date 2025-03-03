import { useEdit } from "../../provider/EditProvider";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;

  button {
    padding: 8px 12px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.edit-btn {
      background-color: #2196f3; /* 수정하기 버튼 색상 */
      color: white;
    }

    &.delete-btn {
      background-color: #f44336; /* 삭제하기 버튼 색상 */
      color: white;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

const Content = styled.div`
  margin-top: 16px;

  .post-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .post-info {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 16px;
  }

  .post-content {
    font-size: 1rem;
    line-height: 1.5;
    white-space: pre-wrap; /* 줄바꿈 유지 */
  }
`;

interface Post {
  post: any;
}

export default function DetailView({ post }: Post) {
  const { setIsEditing } = useEdit();
  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  return (
    <Container>
      <ButtonContainer>
        <button className="edit-btn" onClick={handleEditClick}>
          수정하기
        </button>
        <button className="delete-btn">삭제하기</button>
      </ButtonContainer>
      <Content>
        <div className="post-title">{post.subject}</div>
        <div className="post-info">
          [작성자] {post.author.name} <br />
          [작성시간] {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-content">{post.content}</div>
      </Content>
    </Container>
  );
}
