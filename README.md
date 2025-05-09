📍 강의 사이트 : NOMAD CORDER
📍 강의 제목 : React JS 마스터클래스
📍 강의 챕터 : #9 NOMFLIX CLONE
📍 비고 : 해당 강의에서는 react-router-dom 5.3.0 버전을 사용했지만 나는 react-router-dom 6 버전으로 강행!
📍 라이브러리 :

react + typescript : npx create-react-app checklist --template typescript
styled-components : npm i styled-components, npm i --save-dev @types/styled-components
react-router-dom : npm i react-router-dom, npm i --save-dev @types/react-router-dom
recoil (React v18 이하에서 구동) : npm i recoil 
framer-motion : npm i framer-motion
react v18 다운그레이드 : npm i react@18 react-dom@18
react-query (React v18 이하에서 구동) : npm i react-query 

🚫 미사용 라이브러리

apex-charts : npm install apexcharts --save
react-helmet : npm i react-helmet
react-hook-form : npm i react-hook-form
react-icons : npm i react-icons --save
react-beautiful-dnd : npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
gh-pages : npm i gh-pages

---

### #9.1

**📗프로젝트 route 설정**
**📗공용 Component(Navigation) 구현**

---

### #9.2
**📗헤더 로고에 마우스 hover시 로고가 깜빡이는 기능 구현**
**📗헤더 category에 useMatch를 활용하여 match시 category 하단부에 빨간 점 생성**

---

### #9.3
**📗헤더 category 하단부 빨간점에 layoutId를 통해 이동하는 애니메이트 적용하기**
**📗헤더 Search에 애니메이트 구현하기**
- transform-origin은 변화가 시작하는 위치를 나타낸다. 
  - scaleX를 0->1로 애니메이트 할 시 요소의 정가운데를 기준으로 scaleX가 발생하지만, transform-origin:right,center로 설정 시? 요소의 오른쪽을 기준으로 scaleX가 발생

---

### #9.4
**📗useAnimation() 사용법**
- useAnimation은 동시에 여러개의 animation을 처리할 때 유용하다고 한다.
**📗useScroll()을 활용하여 Scroll시 헤더에 애니메이션 부여하기**

---

### #9.5
**📗api.ts에 api관련 내용 작성하고 useQuery()를 통해 API 불러오기**

---

### #9.6
**📗api data에 타입하기**
**📗Loader(loading...) 만들기**
**📗Home화면에 대형Banner 만들기**
- tmdb에서 받은 data를 활용하여 각 data별 포스터이미지 받아오기
- background-image: url(이미지url), linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))로 그라데이션 추가

---

### #9.7~#9.8
**📗AnimatePresence로 슬라이드구현하기**
**📗body에 overflow-x:hidden으로 슬라이드 시 스크롤 바 생성되는거 없애기**

---

### #9.8 댓글
**📗resize event가 없는 React에서 resize function 만들기**

---

### #9.9~#9.10
**📗슬라이드 item에 hover시 애니메이션 구현하기**

---

### #9.11
**📗영화 Detail Route 만들기**
- useNavigate()로 컴포넌트 내에서 URL을 변경하고 페이지 이동하기
- useMatch(route)로 현재url이 route와 일치하면 특정 Component 출력하기

---

### #9.12
**📗영화 Detail Route 만들기**
- Detail div 주변에 어두운 Overlay div 만들기
- useScroll()로 Detail div를 현재 스크롤된 화면의 중앙에 배치하기

---

### #9.13
**📗영화 Detail Route 만들기**

---
