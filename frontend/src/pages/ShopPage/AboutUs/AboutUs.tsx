import { Shop } from '../../../types/ShopTypes'

const ShopAboutUs = ({ shop }: { shop: Shop }) => {

  return ( 
    <>
      <h1 className='shop-title'>ABOUT US</h1>
      <h3 className='shop-title'>{shop.name}</h3>
      <p className='shop-title'>{shop.sales.toLocaleString()} <span className='gray-text'>Sales</span></p>
      <p className='about-us'>{shop.about_us}</p>
    </>
  );
}
 
export default ShopAboutUs;
