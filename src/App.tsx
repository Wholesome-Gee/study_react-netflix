import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import { ReactQueryDevtools } from "react-query/devtools"

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/tv' element={<Tv/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/' element={<Home/>}>
          <Route path='movies/:movieId' element={<Home/>}/>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  );
}

// react-router-dom v6이상으로 route 설정하는방법 <BrowserRouter> → <Routes> → <Route path='/' element={<Home/>}>

