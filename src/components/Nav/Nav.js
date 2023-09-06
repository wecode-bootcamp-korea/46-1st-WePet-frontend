import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faMagnifyingGlass,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons'

import Modal from './Component/Modal'
import SearchModal from './Component/SearchModal'
import MENU_DATA from './data/navData'
import Ham from './Component/Ham'

import './Nav.scss'

const Nav = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('TOKEN')
  const [isLogoHover, setIsLogoHover] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isSearchModal, setIsSearchModal] = useState(false)

  const handleHoverLogo = () => {
    setIsLogoHover(prev => !prev)
  }

  const handleLogout = () => {
    if (token !== null) {
      localStorage.removeItem('TOKEN')
      token = null
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  const handleCart = () => {
    if (token !== null) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  const handleMyPage = () => {
    if (token !== null) {
      navigate('/mypage')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <div className="nav">
        <Link to="/" onMouseOver={handleHoverLogo} onMouseOut={handleHoverLogo}>
          <img
            className="logo"
            src={`/images/Logo${isLogoHover ? 'Yellow' : 'Black'}.png`}
            alt="wepetIcon"
          />
        </Link>
        <div className="category">
          {MENU_DATA.map((data, key, index) => {
            return (
              <Link to={data.link} key={key} index={index}>
                <span className="categoryName">{data.name}</span>
              </Link>
            )
          })}
        </div>
        <div className="navIcon">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={() => {
              setIsSearchModal(prev => !prev)
            }}
            size="xl"
            className="icon"
          />
        </div>
        <div className="navIcon">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="xl"
            className="icon"
            onClick={handleCart}
          />
        </div>
        <div className="navIcon">
          <FontAwesomeIcon
            icon={faFaceSmile}
            size="xl"
            className="icon"
            onClick={handleMyPage}
          />
        </div>
        <button className="loginBtn" onClick={handleLogout}>
          {token ? '로그아웃' : '로그인'}
        </button>
        {isSearchModal ? (
          ''
        ) : (
          <Ham
            setIsModal={setIsModal}
            isModal={isModal}
            // style={{ z-index:1000 }}
          />
        )}
      </div>
      {isModal && <Modal />}

      {isSearchModal && (
        <SearchModal
          searchModal={isSearchModal}
          setSearchModal={setIsSearchModal}
        />
      )}
    </>
  )
}
export default Nav
