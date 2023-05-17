import './Loading.css'
import loadingBg from '../../assets/ui/loadingBg.png'
import loadingCircle from '../../assets/ui/loadingCircle.png'

const Loading = () => {

  return (
    <div className='loading'>
      <img src={loadingBg} alt="loadingBg" className='loadingBg' />
      <div>
        <h1>
          <span>대</span>
          <span>전</span>
          <span>&nbsp;</span>
          <span>상</span>
          <span>대</span>
          <span>를</span>
          <span>&nbsp;</span>
          <span>찾</span>
          <span>는</span>
          <span>&nbsp;</span>
          <span>중</span>
          <span>입</span>
          <span>니</span>
          <span>다</span>
          <span>.</span>
        </h1>
        <br />
        <br />
        <br />
        <br />
        {/* <img src={loadingCircle} alt="loadingCircle" className="loadingCircle"/> */}
      </div>

    </div>
  )
}
export default Loading;