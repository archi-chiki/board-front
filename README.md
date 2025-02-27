## 2025. 02. 27 홈웕크

### 1. 커스텀 훅으로 boardFetch()와 useBoardFetch()를 선언한 뒤 컴포넌트에서 사용했을 때 발생되는 문제점을 파악하시오

- 우선 아래와 같은 에러 메시지가 발생되었습니다 선생님...ㅠ
- 우선 "React Hook은 'use'라는 키워드로 시작되어야 한다"는 내용의 런타임 에러가 발생된다.
- 하지만,, 웹 브라우저의 콘솔로그를 확인해보았을 때, 실질적으로 데이터를 가져오는 기능을 수행하고 있는 것으로 파악되었읍니다..(API 호출 자체가 불가해야 하는게 맞겠지요..?)

```tsx
React Hook "useState" is called in function "boardFetch" that is
neither a React function component nor a custom React Hook
function. React component names must start with an uppercase
letter. React Hook names must start with the word "use".
```

### 2. JSX(TSX) 파일이 아닌데도 React의 훅을 사용할 수 있는 이유

- JSX(TSX) 확장자는 JS(TS) 안에 HTML 태그를 함께 사용할 수 있도록 문법을 지원한다는 특징이 존재하며, 어떤 확장자를 사용하더라도 컴파일 하게되면 결과적으로 모두 동일한 JS를 반환하기 때문이다.
- React 훅 역시, JS에 함수로 정의되어 있는 존재이기 때문에 파일 확장자와 관계없이 모두 import하여 사용할 수 있는 것이다.
- 잘 이해한게 맞는걸까요 선생님..?

### 3. useCallBack()을 활용한 함수 메모이제이션 활용

- 선생님,, 죄송합니다.. 함수 메모이제이션을 어디서 사용해야할지 감이오지 않습니다..
