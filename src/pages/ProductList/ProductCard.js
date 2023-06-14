import { Link } from 'react-router-dom'

const ProductCard = ({
  product: { productId, index, productImage, productName, productPrice },
}) => {
  return (
    <Link to={`/products/details/${productId}`} key={productId}>
      <div className="productItem" key={index}>
        <img className="productImg" src={productImage} alt="productDetailImg" />
        <div className="productText">
          <p className="itemName">{productName}</p>
          <p className="itemPrice">{`${parseFloat(
            productPrice
          ).toLocaleString()}원`}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
