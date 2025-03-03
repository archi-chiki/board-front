/* 응답 데이터 확인시 */
// const axios = require("axios");

// const postData = async () => {
//   const response = await axios.get("http://localhost:9000/board");

//   console.log(response.data.posts);
//   console.log(response.data.pageInfo);
//   return response;
// };

// postData();

/* 더미 데이터 삽입 */
const axios = require("axios");

async function insertDataRepeatedly() {
  const url = "http://localhost:9000/board/write"; // 데이터를 전송할 서버 URL

  // 반복적으로 사용할 authorId 배열
  const authorIds = [1, 2, 3, 4];

  // 반복적으로 삽입할 데이터의 기본 구조
  const baseData = {
    subject: "테스트입니다",
    content: "테스트입니다",
  };

  // 총 반복 횟수 (예: 총 10개의 데이터를 삽입한다고 가정)
  const totalInserts = 100;

  for (let i = 0; i < totalInserts; i++) {
    try {
      // 현재 authorId를 순환적으로 선택
      const authorId = authorIds[i % authorIds.length];

      // 데이터 생성
      const postData = {
        ...baseData,
        subject: `${baseData.subject} ${i + 1}`, // subject에 번호 추가
        content: `${baseData.content} ${i + 1}`, // content에 번호 추가
        authorId, // 현재 authorId 할당
      };

      // Axios POST 요청
      const response = await axios.post(url, postData);

      console.log(`Inserted: ${JSON.stringify(postData)}, Response:`, response.data);
    } catch (error) {
      console.error(`Error inserting data for iteration ${i + 1}:`, error.message);
    }
  }
}

// 실행
insertDataRepeatedly();
