import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components"

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`
const Categories = styled.ul`
  display: flex;
  align-items: center;
`;
const Category = styled.li`
  margin-right: 20px;
  position: relative;
  color: ${(props) => props.theme.white.darkWhite};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lightWhite};
  }
`;
const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`; 
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`
// left: 0, right:0, margin: 0 auto 는 absolute요소를 relative요소 기준으로 가운데정렬 시키는 방법  #9.2
const Input = styled(motion.input)`
  padding: 8px 10px 8px 0 ;
  padding-left: 40px;
  border: 1px solid ${(props) => props.theme.white.lightWhite};
  font-size: 14px;
  color: white;
  z-index: -1;
  position: absolute;
  right: 0px;
  transform-origin: right center;
  background-color: transparent;
`
// transform-origin은 변화가 시작하는 위치를 나타낸다.  #9.3

const logoVariant = {
  start: {
    fillOpacity: 1
    // fillOpacity는 svg의 fill(채우기)의 opacity를 조절함  #9.2
  },
  hover: {
    fillOpacity: [1,0.5,0,0.5,1],
    transition: {
      repeat: Infinity,
      duration: 1
    }
  },
}


export default function Navigation(){
  const homeMatch = useMatch('/')
  const tvMatch = useMatch('/tv')
  // useMatch(url)은 현재 url이 url과 일치하면 현재 url에대한 오브젝트를 반환  #9.2
  // console.log(homeMatch, tvMatch);
  const [searching, setSearching] = useState(false)
  const inputAnimation = useAnimation()
  // motion요소에 useAnimation을 부여함으로써 여러개의 animation을 가독성 좋은 코드로 처리할 수 있다.  #9.4

  function changeSearching() {
    if(searching){
      inputAnimation.start({
      // 다음 코드는 inputAnimation이 부여된 motion요소의 initial="start"와 같다.
        scaleX:0
      }) 
    } else {
      inputAnimation.start({
        scaleX:1
      })
    }
    setSearching(searching=> !searching)
  }


  return (
    <Nav>
      <Column>
        <Logo
          variants={logoVariant}
          initial="start"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Categories>
          <Category><Link to={'/'}>Home {homeMatch && <Circle layoutId="circle"/>}</Link></Category>
          <Category><Link to={'/tv'}>TV Shows {tvMatch && <Circle layoutId="circle"/>}</Link></Category>
        </Categories>
      </Column>
      <Column>
        <Search>
          <motion.svg
            onClick={changeSearching}
            animate={{x:searching?-190:0}}
            transition= {{ type:"linear"}}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            >
            </path>
          </motion.svg>
          <Input 
            animate={inputAnimation}
            transition= {{ type:"linear"}}
            placeholder="검색어를 입력하세요."
          />
        </Search>
      </Column>
    </Nav>
  )
}

/*
Nav - Column:first-child - Categories - Category => layoutId를 통해 두 Circle의 애니메이트를 연결시켜준다. (빨간점이 좌우로 왔다갔다 거림)  #9.3
Nav - column:nth-child(2) - Search - Input => useAnimation으로 생성된 inputAnimation을 Input의 animate에 적용시켜주면 된다.  #9.3

*/