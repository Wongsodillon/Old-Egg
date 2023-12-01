import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByID } from '../../api/ProductsAPI';
import { getMyWishlist, addProductToWishlist } from '../../api/WishlistsAPI';
import { ProductDetails } from '../../types/ProductTypes';
import { WishlistBody } from '../../types/WishlistTypes';
import Rating from '../../components/Rating/Rating';
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import AddToWishlistModal from '../../components/Modal/AddToWishlistModal';
import { AddCart } from '../../types/CartType';
import { addToCart } from '../../api/CartsAPI';
import "./ProductDetail.scss"

const ProductDetail = () => {

  const { id } = useParams()
  const user = useAuth()
  const [product, setProduct] = useState<ProductDetails>()
  const [urlIndex, setUrlIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [addModal, setAddModal] = useState(false)
  const [myWishlist, setMyWishlist] = useState<WishlistBody[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length > 0) {
        const wishlists = await getMyWishlist(user.id)
        const response = await getProductByID(id)
        setProduct(response)
        setMyWishlist(wishlists)
      }
    }
    fetchData()
  }, [user])

  const addToWishlist = async (wishlist_id: any) => {
    try {
      const result = await addProductToWishlist({ wishlist_id, id, qty })
      if (result) {
        window.location.reload()
        setAddModal(false)
      }
    } catch {
      console.log('error')
    }
  }

  const handleAddToCart = async ({ user_id, product_id, quantity}: AddCart) => {
    try {
      const result = await addToCart({ user_id, product_id, quantity })
      if (result) {
        alert('Added to cart!')
      }
    } catch {
      console.log('error')
    }
  }

  if (!product || !myWishlist || Object.keys(user).length == 0) return (<div>Loading...</div>)

  return (  
    <>
      <div className={addModal ? `modal` : `none`}>
        <AddToWishlistModal setAddModal={setAddModal} addToWishlist={addToWishlist}/>
      </div>
      <div className="product-detail-page flex gap-2">
        <div className='product-image'>
          <img src={product.product_url[urlIndex]} className='curr-image' />
          <div className='flex justify-start images'>
            {product.product_url.map((url, index) => {
              return (
                <img className={index == urlIndex ? 'active-url image-thumbnail' : 'image-thumbnail'} src={url} alt="" key={index} onClick={() => setUrlIndex(index)}/>
              )})}
          </div>
        </div>
        <div className='product-information flex flex-col gap-1-5 items-start'>
          <p className='name'>{product.product_name}</p>
          <Rating rating={product.product_rating} rating_count={product.product_rating_count}/>
          {product.product_stock != 0 ? 
            <p><span className='bold'>In Stock: {product.product_stock}</span></p> :
            <p className=''> OUT OF STOCK </p>
          }
          {product.product_shipping_price == 0 ? 
            <p className='shipping-price flex items-start gap-0-5'>
              <FaStar/>
              FREE SHIPPING
            </p> :
            <p className='shipping-price'>
            {`SHIPPING: $${product.product_shipping_price}`}
            </p>
          }
          <p className='visit'>Visit <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/shop/${product.product_shop_id}`}>{product.product_shop}</Link> </p>
        </div>
        <div className="manage-order flex flex-col items-start gap-1">
          <p className='sold-shipped'>SOLD & SHIPPED NEWEGG</p>
          <div className='product-prices flex flex-col items-start gap-1 full-width'>
            <p className='gray-text est'>Estimated GST Inclusive</p>
            <p className='price'>${product.product_price}</p>
            <div className='flex items-center full-width gap-1'> 
              <input type="number" className='qty-input' defaultValue={qty} min={1} onChange={(e) => setQty(parseInt(e.target.value))}/>
              <button className='orange-button flex-1' 
              onClick={() => handleAddToCart({ user_id: user.id, product_id: product.product_id, quantity: qty })}>ADD TO CART
              </button>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <FaRegHeart size={20}/>
            <p className='pointer' onClick={() => setAddModal(true)}>ADD TO LIST</p>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default ProductDetail;