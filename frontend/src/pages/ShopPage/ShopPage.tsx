import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ShopPage.scss"
import { getShopByID, getShopCategory } from '../../api/ShopsAPI';
import { Shop } from '../../types/ShopTypes';
import Rating from '../../components/Rating/Rating';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { ProductResult } from '../../types/ProductTypes';
import { getProductsByShopID } from '../../api/ProductsAPI';
import ShopAboutUs from './AboutUs/AboutUs';
import ShopReviewPage from './ShopReview';

type ShopCategory = {
  product_id: number
  product_name: string
  product_url: string
  product_category: string
}

const ShopPage = () => {

  const [tab, setTab] = useState(1)
  const [products, setProducts] = useState<ProductResult[]>([])
  const [shop, setShop] = useState<Shop>()

  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([])

  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await getShopByID(id)
        const shopProducts = await getProductsByShopID(id)
        const categories = await getShopCategory(id)
        setShop(response)
        setProducts(shopProducts)
        setShopCategories(categories)
      }
    }
    fetchData()
  }, [])

  if (!shop) {
    return <div>Loading...</div>
  }

  return ( 
    <>
      <div className="shop-header flex space-between">
        <div className='shop-info-container flex items-center'>
          <div className='shop-url-container'>
            <img src={shop.shop_url} alt="" />
          </div>
          <div className='shop-info flex flex-col items-start'>
            <p className='shop-name bold'>{shop.name}</p>
            <div className='flex shop-more-info'>
              <p><span className='bold'>{shop.sales.toLocaleString()}</span> Sales </p>
              <p><span className='bold'>{shop.followers.toLocaleString()}</span> followers</p>
              <div className='flex gap-0-25'>
                <Rating rating={shop.rating} rating_count={-1}/> 
                <p className='gray-text'>{shop.rating_count} Ratings</p>
              </div>
            </div>
            <div className='bottom-shop-info flex'>
              <button className='shop-follow'>FOLLOW</button>
              <button className='message-shop'>MESSAGE</button>
            </div>
          </div>
        </div>
        <div>
          <form action="">
            <input type="text" />
          </form>
        </div>
      </div>
      <div className="shop-tab">
        <div className={tab == 1 ? 'active-tab shop-tab-container' : 'shop-tab-container'} onClick={() => setTab(1)}>
          <p>Store Home</p>
        </div>
        <div className={tab == 2 ? 'active-tab shop-tab-container' : 'shop-tab-container'} onClick={() => setTab(2)}>
          <p>All Products</p>
        </div>
        <div className={tab == 3 ? 'active-tab shop-tab-container' : 'shop-tab-container'} onClick={() => setTab(3)}>
          <p>Reviews</p>
        </div>
        <div className={tab == 4 ? 'active-tab shop-tab-container' : 'shop-tab-container'} onClick={() => setTab(4)}>
          <p>Return Policy</p>
        </div>
        <div className={tab == 5 ? 'active-tab shop-tab-container' : 'shop-tab-container'} onClick={() => setTab(5)}>
          <p>About Us</p>
        </div>
      </div>
      <div className={tab == 1 ? 'store-home flex flex-col' : 'none'}>
        <img src={shop.shop_banner_url} className='shop-banner' />
        <div className='shop-categories-container flex flex-col items-start gap-1-5'>
          <h2 className='shop-title'>SHOP BY CATEGORY</h2>
          <div className='shop-categories grid'>
            {shopCategories.map((category) => {
              return (
                <div className='shop-category-card flex flex-col gap-1' key={category.product_id}>
                  <img src={category.product_url} alt="" />
                  <p>{category.product_category.toUpperCase()}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={tab == 2 ? 'products-shop' : 'none'}>
        <main className='flex margin-padding'>
          <ProductsGrid products={products} context={'shop'}/>
        </main>
      </div>
      <div className={tab == 3 ? 'shop-reviews' : 'none'}>
        <main className='flex margin-padding'>
          <ShopReviewPage shop={shop}/>
        </main>
      </div>
      <div className={tab == 4 ? 'return-policy' : 'none'}>
        Return Policy
      </div>
      <div className={tab == 5 ? 'shop-about-us' : 'none'}>
        <ShopAboutUs shop={shop}/>
      </div>
    </>
  );
}
 
export default ShopPage;