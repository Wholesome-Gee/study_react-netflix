import { useEffect, useState } from 'react';

export default function Resize() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  function handleResize() { setInnerWidth(window.innerWidth) }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return innerWidth;
}

/*
React는 resize event가 없기때문에 resize function을 직접 만들어줘야함
1. 해당 Component에서 Resize 함수를 만들어주었고, 
2. Home.tsx에서 const width=Resize
3. <Row initial={{x:width+10}} animate={{x:0}} exit={{x:-width-10}} transition={{type:"tween", duration:1 }} key={rowIndex}> 
    이런식으로 직접 initial, animate, exit값을 명시 (variants 금지)
*/