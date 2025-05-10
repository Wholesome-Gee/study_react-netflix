// api.ts에는 api와 관련된 정보들을 입력한다. (API key, API token, API fetch함수)  #9.5
// themoviedb.org 사이트 > More > API문서 참조  #9.5

// #9.5
const API_KEY = '2c80d3112711a801b0591f3a17fc3ae1'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzgwZDMxMTI3MTFhODAxYjA1OTFmM2ExN2ZjM2FlMSIsIm5iZiI6MS42NzE2MTA0NjA3ODQ5OTk4ZSs5LCJzdWIiOiI2M2EyYzA1YzJmM2IxNzAwYTAxMWZmMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dMuDVSM5K0ZzozoyMlhWtGibM_CIxB7WYCU6eourGkM'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+API_TOKEN
  }
};

interface IMovie {
  "adult": boolean,
  "backdrop_path": string,
  "id": number,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "video": boolean
  "vote_average": number,
  "vote_count": number
}
export interface IGetMovies {
  "dates": {
    "maximum": string,
    "minimum": string
  },
  "page": number,
  "results": IMovie[]
}
// Home.tsx에서 useQuery<IGetMovies>(['movies','nowPlaying'],getMovies)  #9.6
// results부분은 다 작성할 필요 없고, 사용할 데이터만 골라서 타입하면 된다.  #9.6

export function getMovies(){
  return fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',options).then(response=>response.json())
}

export function getMovieImage(backdropPath:string, format?:string){
  return `https://image.tmdb.org/t/p/${format?format:"original"}${backdropPath}`
}
// getMovies로 받은 data에서 backdrop_path를 사용하여 이미지파일을 받아오는방법  #9.6