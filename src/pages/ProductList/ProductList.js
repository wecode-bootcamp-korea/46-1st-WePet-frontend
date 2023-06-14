import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIS } from '../../config'
import ProductCard from './ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './ProductList.scss'

const ProductList = () => {
  const { id } = useParams()
  const [dropBox, isOpenDropBox] = useState(false)
  const [products, setProducts] = useState([])
  const [orderBy, setOrderBy] = useState('')

  useEffect(() => {
    let url = `${APIS.product}/filter?offset=0&limit=40${
      id === '0' ? '' : `&categoryId=${id}`
    }`

    if (orderBy !== '') {
      url += `&orderBy=${orderBy}`
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setProducts(response.data)
      })
  }, [id, orderBy])

  const handleQueryString = key => {
    setOrderBy(key)
  }

  return (
    <div className="productList">
      <header className="productListHeader">
        <h1 className="productListTitle">
          {HEADER_DATA[id].title}
          <sup className="totalQuantity">총 {products.length} 개</sup>
        </h1>

        <div className="headerContentBox">
          <p
            className="headerContent"
            dangerouslySetInnerHTML={{ __html: HEADER_DATA[id].descripion }}
          />
        </div>
      </header>
      <div className="filterBox">
        <div className="dropBoxWrapper">
          <button
            className="dropBox"
            onClick={() => {
              isOpenDropBox(prev => !prev)
            }}
          >
            추천순
            <FontAwesomeIcon className="dropBoxArrow" icon={faChevronDown} />
          </button>
          {dropBox && (
            <div className="dropBoxListContainer">
              <div className="dropBoxList">
                {DROP_BOX.map(({ title, key }, index) => {
                  return (
                    <span
                      key={index}
                      className="dropBoxContent"
                      onClick={() => {
                        handleQueryString(key)
                      }}
                    >
                      {title}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="productListMain">
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />
        })}
      </div>
    </div>
  )
}

export default ProductList

const HEADER_DATA = {
  0: { title: '전체', descripion: '여기에 다 있어요!' },
  1: {
    title: '사료',
    descripion:
      '가장 신선하고, 차별화된 유기농 제품으로 <br><br> 우리 아이들의 건강까지 생각합니다',
  },
  2: {
    title: '간식',
    descripion:
      '가장 신선하고, 차별화된 유기농 제품으로<br><br>  우리 아이들의 건강까지 생각합니다',
  },
  3: {
    title: '용품',
    descripion:
      '편리하고, 안전한 제품들로<br><br> 우리 아이들의 행복한 라이프까지 생각합니다 ',
  },
}

const DROP_BOX = [
  { title: '추천순', key: 'recommended' },
  { title: '최신순', key: 'newest' },
  { title: '높은가격순', key: 'priceDESC' },
  { title: '낮은가격순', key: 'priceASC' },
]
