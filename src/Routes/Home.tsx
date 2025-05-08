import { useQuery } from "react-query"
import { getMovies } from "../api"

export default function Home(){
  const {data, isLoading} = useQuery(["movies","nowPlaying"],getMovies) // useQuery([식별자1,식별자의 식별자], fetch함수), useQuery는 fetch함수의 data와 loading상태를 리턴한다.  #9.5
  console.log(data, isLoading)
  return (
    <div style={{height:"300vh"}}>Home</div>
  )
}