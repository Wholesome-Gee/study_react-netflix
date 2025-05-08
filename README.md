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


🚫 미사용 라이브러리

react-query (React v18 이하에서 구동) : npm i react-query 
apex-charts : npm install apexcharts --save
react-helmet : npm i react-helmet
react-hook-form : npm i react-hook-form
react-icons : npm i react-icons --save
react-beautiful-dnd : npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
react v18 다운그레이드 : npm i react@18 react-dom@18
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