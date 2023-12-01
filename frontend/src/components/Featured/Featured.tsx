import { useState, useEffect } from "react"
import { getFeaturedBrands, getFeaturedProducts } from '../../api/ProductsAPI';
import { FeaturedProduct } from "../../types/ProductTypes";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./Featured.scss"

type Brand = {
  id: number
  name: string
  brand_url: string
}

type Shop = {
  id: number
  name: string
  url: string
}

const Featured = () => {
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpBrands = await getFeaturedBrands()
        const tmpProducts = await getFeaturedProducts()
        setBrands(tmpBrands)
        setProducts(tmpProducts)
      } catch (err) {
        console.error(err)
      }
    };
    
    fetchData()
  }, []);

  return ( 
  <>
    <div className='featured'>
      <div className='featured-container'>
        <p className='featured-title'>FEATURED BRANDS</p>
        <div className='featured-items'>
          {brands.map(brand => {
            return (
              <div className='featured-item' key={brand.id}>
                <img src={brand.brand_url} alt='dummy'/>
              </div>
          )})}
        </div>
      </div>
      <div className='featured-container'>
        <p className='featured-title'>FEATURED PRODUCTS</p>
        <div className='featured-products'>
          {products.map(product => {
            return (
              <div className='featured-product' key={product.product_id}>
                <img src={product.product_url} alt="" />
                <div className="product-info">
                  <Rating rating={product.product_rating} rating_count={product.product_rating_count}/>
                  <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/product/${product.product_id}`}>
                    <p className="product-name">{product.product_name}</p>
                  </Link>
                  <p className="product-price">${product.product_price}</p>
                  <p className="shipping-price">
                    {product.product_shipping_price == 0 ? "FREE SHIPPING" : `Shipping Price: $${product.product_shipping_price}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
  );
}
 
export default Featured;