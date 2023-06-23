import './ShowResult.css'
import { BsFillCaretLeftFill } from 'react-icons/bs'
import { BsFillVolumeUpFill } from 'react-icons/bs'
import imgLogo from '../../assets/gartic-phone.svg'

import imgAvatar from '../../assets/avatar-1.svg'
import imgNormal from '../../assets/normal.svg'
import { BsFillSendXFill } from 'react-icons/bs'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
const ShowResult = () => {
  return (
    <div className="sr-screen">
      <div className="sr-content">
        <div className="sr-header">
          <button className="sr-btn-back">
            <BsFillCaretLeftFill />
            Back
          </button>
          <img src={imgLogo} alt="logo" className="sr-img-logo" />
          <button className="sr-btn-sound">
            <BsFillVolumeUpFill size={'24px'} />
          </button>
        </div>
        <div className="sr-sub-header">
          <div className="sr-sub-left">PLAYERS</div>
          <div className="sr-sub-right">COOLNICKNAME1978'S ALBUM</div>
        </div>
        <div className="sr-center">
          <div className="sr-left">
            <div className="sr-player">
              <img className="sr-img-avatar" src={imgAvatar} alt="avatar" />
              <span className="sr-name">AAAA</span>
            </div>
          </div>
          <div className="sr-right">
            <div className="sr-message sr-mess-right ">
              <div className="sr-mess-content">
                <div className="sr-content-name">Name Name Name</div>
                <div className="sr-content-text">
                  thoa thoa thoa thoa thoa thoa thoa thoa
                </div>
              </div>
              <img src={imgAvatar} alt="" className="sr-mess-avatar" />
            </div>

            <div className="sr-message sr-mess-left ">
              <div className="sr-mess-content">
                <div className="sr-content-name">Name Name Name</div>
                <div className="sr-content-img">
                  <img src={imgAvatar} alt="" className="sr-content-img" />
                </div>
              </div>
              <img src={imgAvatar} alt="" className="sr-mess-avatar" />
            </div>
            <div className="sr-message sr-mess-right ">
              <div className="sr-mess-content">
                <div className="sr-content-name">Name Name Name</div>
                <div className="sr-content-text">thoa truowngg</div>
              </div>
              <img src={imgAvatar} alt="" className="sr-mess-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowResult
