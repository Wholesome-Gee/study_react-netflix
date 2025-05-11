import { useQuery, useQueryClient } from "react-query"
import { getFirstMovie, getMovieImage, getMovies, IGetFirstMovie, IGetMovies } from "../api"
import styled from "styled-components"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { useState } from "react"
import Resize from "../Resize"
import { useMatch, useNavigate } from "react-router-dom"

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
  font-size: 20px;
  line-height: 28px;
`
const Slider = styled.div`
  position: relative;
  top: -100px;
  height: 100%;
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
  background-image: url(${(props)=>props.bgImg});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lightBlack};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`
const Detail = styled(motion.div)<{scrollY:number}>`
  width: 40vw;
  height: 80vh; 
  margin: 0 auto;
  position: absolute;
  border-radius: 15px;
  top: ${(props)=>props.scrollY+65}px;
  left: 0; 
  right: 0;
  overflow: hidden; 
  background-color: ${(props)=>props.theme.black.lightBlack}; 
`
const MovieImg = styled.div<{bgImg:string}>`
  width: 100%;
  height: 400px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)), url(${(props)=>props.bgImg});
  background-size: cover;
  background-position: center center;
`
const MovieTitle = styled.h3`
  padding: 20px;
  font-size: 40px;
  color: ${(props)=>props.theme.white.lightWhite};
  position: relative;
  top: -80px;
`
const MovieOverview = styled.p`
  padding: 20px;
  color: ${(props)=>props.theme.white.lightWhite};
  position: relative;
  top: -80px;
`
const PrevBtn = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(270,270,270,0.5);
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100px;
  left: 20px;
  opacity: 0.5;
  cursor: pointer;
  background-color: black;
  &:hover {
  background-color: white;
  }
`
const NextBtn = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(270,270,270,0.5);
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100px;
  right: 20px;
  opacity: 0.5;
  cursor: pointer;
  background-color: black;
  &:hover {
  background-color: white;
  }
`
const SliderTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
  position: relative;
  top: -10px;
`
const More = styled.div`
  margin-top: 20px;
  color: #aaa;
  span {
    margin-right: 20px;
  }
`
const boxVariants = {
  start: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.4,
      duration: 0.2,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay:0.4,
      duration: 0.2,
      type:"tween",
    }
  }
}

export default function Home(){
  const {data:nowMovies, isLoading:isLoadingNowMovie} = useQuery<IGetMovies>(["movies","nowPlaying"],getMovies) // useQuery([식별자1,식별자의 식별자], fetch함수), useQuery는 fetch함수의 data와 loading상태를 리턴한다.  #9.5
  const [rowIndex, setRowIndex] = useState(0)
  const [sliding, setSliding] = useState(false)
  const movieMatch = useMatch('/movies/:movieId')  // useMatch(route)는 현재 url이 route와 일치하면 route에 대한 Object를 반환한다.  #9.11
  const navigate = useNavigate()  // useNavigate()는 React Router v6에서 제공하는 Hook으로, 컴포넌트 내에서 URL을 변경하고 페이지 이동을 도와준다. (React Router v5이하에서는 useHistory())  #9.11
  const {scrollY} = useScroll() // useScroll()은 scrollY,scrollYProgress,scrollX,scrollXProgress 총 4개의 motionValue를 반환하며, 이 motionvalue들은 .get()을 통해 js number타입으로 사용가능하다.  #9.12
  const offset = 6; // 한 Row당 보여질 Box 개수  #9.8
  const width = Resize()
  const choiceMovie = movieMatch?.params.movieId && nowMovies?.results.find((movie)=>movie.id+"" === movieMatch.params.movieId)

  console.log('this',choiceMovie)
  
  // console.log(nowMovies, isLoadingNowMovie)
  
  function increaseIndex() {
    if(nowMovies){  // data가 undefined일 시 totalMovies는 undefined가 되기 때문에 if(nowMovies)를 사용함  #9.8
      if(sliding) return;
      setSliding(true);
      const totalMovies = nowMovies.results.slice(1).length;  // data는 20개라고 가정하고, data에서 Banner에 사용한 영화는 제외하기위해 slice(1)  #9.8
      const maxRowIndex = Math.floor(totalMovies / offset) -1;  // totalMovies(19)는 offset(6)으로 나누었을때 딱 떨어지지 않기에 Math.floor로 소수점 내림  #9.8
      setRowIndex(rowIndex => rowIndex===maxRowIndex ? 0 : rowIndex+1 );
    }
  }
  function decreaseIndex() {
    setSliding(true)
    if(nowMovies){  // data가 undefined일 시 totalMovies는 undefined가 되기 때문에 if(nowMovies)를 사용함  #9.8
      if(sliding) return;
      const totalMovies = nowMovies.results.slice(1).length;  // data는 20개라고 가정하고, data에서 Banner에 사용한 영화는 제외하기위해 slice(1)  #9.8
      const maxRowIndex = Math.floor(totalMovies / offset) -1;  // totalMovies(19)는 offset(6)으로 나누었을때 딱 떨어지지 않기에 Math.floor로 소수점 내림  #9.8
      setRowIndex(rowIndex => rowIndex===0 ? maxRowIndex : rowIndex-1 );
    }
  }
  function onBoxClicked(movieId:number) {
    //슬라이더안에 박스 클릭시 url이동
    navigate(`/movies/${movieId}`)
  }
  function onOverlayClick() {
    //Overlay 클릭시 url이동
    navigate('/')
  }
  function overViewMaxLength(overview:string, maxLength = 200) {
  if (overview.length <= maxLength) {
    return overview;
  }
  return overview.slice(0, maxLength)+"...";
}

  return (
    <Container>
      {isLoadingNowMovie ? 
        <Loader>Loading...</Loader> : 
        <>
          <Banner bgImg={getMovieImage(nowMovies?.results[0].backdrop_path||"")}>
            <Title>{nowMovies?.results[0].original_title}</Title>
            <Overview>{overViewMaxLength(nowMovies?.results[0].overview||"")}</Overview>
            <More>
              <span>개봉일 : {nowMovies?.results[0].release_date}</span>
              <span>실시간 평점 : {Math.floor((nowMovies?.results[0].vote_average||0)*10)/10}점</span>
            </More>
          </Banner>
          <Slider>
            <SliderTitle>현재 상영중인 작품</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={()=>{setSliding(false)}}>
            <Row 
              initial={{x:width+10}} 
              animate={{x:0}} 
              exit={{x:-width-10}} 
              transition={{type:"tween", duration:1 }} 
              key={rowIndex}
            >
              { 
                nowMovies?.results.slice(1).slice(rowIndex*offset,rowIndex*offset+offset).map((movie)=>{
                  return (
                    <Box 
                      layoutId={movie.id+""}
                      variants={boxVariants} 
                      initial="start" 
                      whileHover="hover"  
                      transition={{type:"tween"}}
                      bgImg={getMovieImage(movie.backdrop_path||movie.poster_path,"w500")} 
                      onClick={()=>onBoxClicked(movie.id)}
                      key={movie.id}
                    >
                    <Info variants={infoVariants}>
                      <h4>{movie.original_title}</h4>
                    </Info>
                    </Box>
                  )
                })
              }
            </Row>
            <PrevBtn onClick={decreaseIndex}>&larr;</PrevBtn>
            <NextBtn onClick={increaseIndex}>&rarr;</NextBtn>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            <>
              { movieMatch ?
                <>
                  <Overlay onClick={onOverlayClick} animate={{opacity:1}} transition={{type:"tween", duration:0.3}}/>
                  <Detail layoutId={movieMatch.params.movieId} scrollY={scrollY.get()}>
                    {choiceMovie && (
                      <>
                        <MovieImg bgImg={getMovieImage(choiceMovie.backdrop_path||choiceMovie.poster_path||"","w500")}/>
                        <MovieTitle>{choiceMovie.original_title}</MovieTitle>
                        <MovieOverview>{choiceMovie.overview}</MovieOverview>
                      </>
                    )}
                  </Detail> 
                </>:
                null
              }
            </>
          </AnimatePresence>
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