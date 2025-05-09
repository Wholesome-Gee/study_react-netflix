import { useQuery } from "react-query"
import { getMovieImage, getMovies, IGetMovies } from "../api"
import styled from "styled-components"

const Container = styled.div`
  background-color: black;
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
export default function Home(){
  const {data, isLoading} = useQuery<IGetMovies>(["movies","nowPlaying"],getMovies) // useQuery([식별자1,식별자의 식별자], fetch함수), useQuery는 fetch함수의 data와 loading상태를 리턴한다.  #9.5

  console.log(data, isLoading)

  return (
    <Container style={{height:"1000vh"}}>
      {isLoading ? 
        <Loader>Loading...</Loader> : 
        <>
          <Banner bgImg={getMovieImage(data?.results[0].backdrop_path||"")}>
            <Title>{data?.results[0].original_title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      }
    </Container>
  )
}
/*
Container > Banner에 getMovieImage는 id(string)을 무조건 파라미터로 받기때문에 data가 없을 경우 ||""을 활용해 빈string이라도 보내줌  #9.6
*/