import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import Count from './Component/Count'
import DetailInformation from './Component/DetailInformation'
import ImgCarousel from './Component/ImgCarousel'
import Review from './Component/Review'
import GoToTop from './Component/GoToTop'
import CartButton from './Component/CartButton'
import { APIS } from '../../config'

import './ProductDetail.scss'

const ProductDetail = () => {
  const params = useParams()
  const productId = params.id

  const [products, setProducts] = useState()
  const [quantity, setQuantity] = useState(0)
  const [productData, setProductData] = useState({})
  const [isCartBtn, setIsCartBtn] = useState(false)
  const [orderList, setOrderList] = useState({})
  const [imageData, setImageData] = useState()

  useEffect(() => {
    let url = `${APIS.product}/details/${productId}`

    fetch(url)
      .then(response => response.json())
      .then(result => {
        setProductData(result.data)
      })
  }, [])

  if (!productData?.productPrice) return null
  if (!productData?.mainThumbnailImage) return null

  const productPriceNum = Number(productData.productPrice)

  return (
    <div className="productDetail">
      <div className="product">
        <div className="productLeft">
          <p className="productName">{productData.productName}</p>
          <p className="price">{productPriceNum.toLocaleString()}원</p>
        </div>

        <ImgCarousel
          imageData={imageData}
          setImageData={setImageData}
          productId={productId}
        />

        <div className="productRight">
          <div className="line" />
          <p className="delivery">배송정보</p>
          <p className="grey">3,000원 &#40; 80,000원 이상 구매 시 무료&#41;</p>
          <p className="grey">오후 1시 당일배송마감</p>
          <div className="line" />
          <div className="greyBox">
            <p className="title">{productData.productName}</p>
            <div className="countPrice">
              <Count quantity={quantity} setQuantity={setQuantity} />
              <p>{(quantity * productPriceNum).toLocaleString()}원</p>
            </div>
          </div>
          <div className="totalPrice">
            <span>총 금액</span>
            <span>{(quantity * productPriceNum).toLocaleString()}원</span>
          </div>
          <div className="shoppingBtn">
            <div
              className="cartBtn"
              onClick={() => {
                setIsCartBtn(prev => !prev)
              }}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                className="cartIcon"
              />
            </div>
            <Link to="/purchase">
              <button className="buy">바로 구매하기</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="rowLine" />
      <div className="table">
        <span className="greyTitle">상품정보</span>
        <div className="columnLine" />
        <span
          className="greyTitle"
          onClick={() => {
            const element = document.querySelector('.detailInformationBox')
            if (element) {
              const y = element.getBoundingClientRect().top - 100
              window.scrollTo({ top: y, behavior: 'smooth' })
            }
          }}
        >
          기본정보
        </span>
        <div className="columnLine" />
        <span
          className="greyTitle"
          onClick={() => {
            const element = document.querySelector('.reviewBox')
            if (element) {
              const y = element.getBoundingClientRect().top
              window.scrollTo({ top: y, behavior: 'smooth' })
            }
          }}
        >
          상품후기
        </span>
      </div>
      <div className="rowLine" />
      <div className="productImgs">
        {imageData.detailImg.map((img, index) => {
          return <img key={index} src={img} alt="productImages" />
        })}
      </div>
      <div className="detailInformationBox">
        <DetailInformation />
      </div>
      <div className="reviewBox">
        <Review />
      </div>
      <div
        className="goToTopIcon"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <GoToTop />
        {isCartBtn && (
          <CartButton isCartBtn={isCartBtn} setIsCartBtn={setIsCartBtn} />
        )}
      </div>
    </div>
  )
}

export default ProductDetail
