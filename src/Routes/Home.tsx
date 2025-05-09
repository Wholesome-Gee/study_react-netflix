import { useQuery } from "react-query"
import { getMovieImage, getMovies, IGetMovies } from "../api"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Resize from "../Resize"

const Container = styled.div`
  background-color: black;
  padding-bottom: 200px;
`
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Banner = styled.div<{bgImg:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props)=>props.bgImg});
  background-size: cover;
  background-position: center;
`
// background-image를 설정할땐 url(image링크),  linear-gradient는 불러온 image에 그라데이션을 추가한다.  #9.6
const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 16px;
`
const Overview = styled.p`
  width: 50%;
  font-size: 30px;
`
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6,1fr);
  gap: 5px;
  position: absolute;
`
const Box = styled(motion.div)<{bgImg:string}>`
  height: 200px;
  color: red;
  background-image: url(${(props)=>props.bgImg});
  background-size: cover;
  background-position: center center;
`

export default function Home(){
  const {data, isLoading} = useQuery<IGetMovies>(["movies","nowPlaying"],getMovies) // useQuery([식별자1,식별자의 식별자], fetch함수), useQuery는 fetch함수의 data와 loading상태를 리턴한다.  #9.5
  const [rowIndex, setRowIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const offset = 6; // 한 Row당 보여질 Box 개수  #9.8
  const width = Resize()
  
  console.log(data, isLoading)

  function increaseIndex() {
    if(data){  // data가 undefined일 시 totalMovies는 undefined가 되기 때문에 if(data)를 사용함  #9.8
      if(exiting) return;
      setExiting(true);
      const totalMovies = data.results.slice(1).length;  // data는 20개라고 가정하고, data에서 Banner에 사용한 영화는 제외하기위해 slice(1)  #9.8
      const maxRowIndex = Math.floor(totalMovies / offset) -1;  // totalMovies(19)는 offset(6)으로 나누었을때 딱 떨어지지 않기에 Math.floor로 소수점 내림  #9.8
      setRowIndex(rowIndex => rowIndex===maxRowIndex ? 0 : rowIndex+1 );
    }
  }
  function decreaseIndex() {
    setExiting(true)
    if(data){  // data가 undefined일 시 totalMovies는 undefined가 되기 때문에 if(data)를 사용함  #9.8
      if(exiting) return;
      const totalMovies = data.results.slice(1).length;  // data는 20개라고 가정하고, data에서 Banner에 사용한 영화는 제외하기위해 slice(1)  #9.8
      const maxRowIndex = Math.floor(totalMovies / offset) -1;  // totalMovies(19)는 offset(6)으로 나누었을때 딱 떨어지지 않기에 Math.floor로 소수점 내림  #9.8
      setRowIndex(rowIndex => rowIndex===0 ? maxRowIndex : rowIndex+1 );
    }
  }

  return (
    <Container style={{height:"1000vh"}}>
      {isLoading ? 
        <Loader>Loading...</Loader> : 
        <>
          <Banner onClick={increaseIndex} bgImg={getMovieImage(data?.results[0].backdrop_path||"")}>
            <Title>{data?.results[0].original_title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={()=>{setExiting(false)}}>
            <Row 
              initial={{x:width+10}} 
              animate={{x:0}} 
              exit={{x:-width-10}} 
              transition={{type:"tween", duration:1 }} 
              key={rowIndex}
            >
              { 
                data?.results.slice(1).slice(rowIndex*offset,rowIndex*offset+offset).map((movie)=>{
                  return <Box bgImg={getMovieImage(movie.backdrop_path,"w500")} key={movie.id}></Box>
                })
              }
            </Row>
            </AnimatePresence>
          </Slider>
        </>
      }
    </Container>
  )
}
/*
Container > <> > Banner에 getMovieImage는 id(string)을 무조건 파라미터로 받기때문에 data가 없을 경우 ||""을 활용해 빈string이라도 보내줌  #9.6
Container > <> > Slider > AnimatePresence는 motion요소의 exit(사라질때 애니메이션)를 추가해준다.  #9.7
Container > <> > Slider > AnimatePresence의 initial={false}는 처음 AnimatePresence가 mount될때는 animation start가 적용되지 않도록 한다.  #9.8
Container > <> > Slider > AnimatePresence의 onExitComplete={콜백하무}는 AnimatePresence내부에 motion 요소의 exit가 끝나면 콜백함수가 실행된다.  #9.8
Container > <> > Slider > Row의 key={rowIndex}의 rowIndex가 setRowIndex에 의해 변하게 되면 React JS는 기존 key를 가진 Row는 삭제되고, 새로운 key를 가진 Row가 생성되었음을 인식하고 Row Component를 재렌더링 한다.  #9.7
*/