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

export function getMovies(){
  return fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',options).then(response=>response.json())
}