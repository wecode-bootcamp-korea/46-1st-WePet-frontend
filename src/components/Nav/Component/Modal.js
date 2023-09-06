import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { MODAL_UPPER_DATA, MODAL_LOWER_DATA } from '../data/modalData'

import './Modal.scss'
import './modalAnimation.scss'

const Modal = () => {
  const token = localStorage.getItem('TOKEN')

  return (
    <div className="modal">
      <div className="modalContent">
        {token ? (
          <div className="welcomeContent">
            <div className="welcome">
              <p>
                반가워요,
                <br />
                <b className="userName">RM</b>님
              </p>
            </div>
          </div>
        ) : (
          <div className="modalPtag">
            <span className="description">앗!</span>
            <span className="description">로그인이 필요해요</span>
          </div>
        )}
        <span className="ulTitle">테마</span>
        <ul className="ulBox">
          {MODAL_UPPER_DATA.map(data => {
            return (
              <Link to={data.link} key={data.id}>
                <li className="list">{data.name}</li>
              </Link>
            )
          })}
        </ul>
        <span className="ulTitle">카테고리</span>
        <ul className="ulBox">
          {MODAL_LOWER_DATA.map((data, i) => {
            const url = `productList/${i}`
            return (
              <Link className="list" to={url} key={data.name}>
                {data.name}
              </Link>
            )
          })}
        </ul>

        <div className="modalBottom">
          <div className="inquire">
            <div className="inquireIcon">
              <Link to="/mypage">
                <FontAwesomeIcon icon={faHeadset} size="lg" className="icon" />
              </Link>
            </div>
            <Link to="/mypage/qna">
              <span className="personal">1:1 문의</span>
            </Link>
          </div>
          <div className="bottomLine" />
          <div className="emailInquire">
            <a href="mailto:@">
              <span className="mail">이메일 문의</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
