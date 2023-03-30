import { useEffect } from 'react'

const Loading = () => {
  useEffect(()=>{
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', e => {
      if (cursor?.classList.length === 1) {
        cursor?.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
      }
    })

    document.addEventListener('click', () => {
      cursor?.classList.add("expand");

      setTimeout(() => {
        cursor?.classList.remove("expand");
      }, 500);
    })
  }, []);
  


  return (
    <div id="">
      <div className="btn-contain">
        <button className="btn">Click Me!</button>
        <div className="btn-particles">
        </div>
      </div>

      {/* <h1>
        <span>대</span>
        <span>전</span>
        <span> </span>
        <span>상</span>
        <span>대</span>
        <span>를</span>
        <span> </span>
        <span>찾</span>
        <span>는</span>
        <span> </span>
        <span>중</span>
        <span>입</span>
        <span>니</span>
        <span>다</span>
        <span>.</span>
      </h1> */}
    </div>

  )
}
export default Loading;