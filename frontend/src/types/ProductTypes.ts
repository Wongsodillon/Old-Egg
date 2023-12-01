export type ProductResult = {
  product_id: number;
  product_name: string
  product_stock: number
  product_price: number
  product_rating: number
  product_rating_count: number
  product_shipping_price: number
  product_url: string
  product_shop_id: number
  product_shop: string
  product_brand: string
  product_category: string
}

export type FeaturedProduct = {
  product_id: number;
  product_name: string
  product_stock: number
  product_price: number
  product_rating: number
  product_rating_count: number
  product_shipping_price: number
  product_url: string
  shop_id: number
  brand_id: number
  product_category: string
}

export type ShopProducts = {
  product_id: number;
  product_name: string
  product_stock: number
  product_price: number
  product_rating: number
  product_rating_count: number
  product_shipping_price: number
  product_url: string
  category_id: number
  brand_id: number
  brand_url: string
}

export type ProductDetails = {
  product_id: number;
  product_name: string
  product_stock: number
  product_price: number
  product_rating: number
  product_rating_count: number
  product_shipping_price: number
  product_url: string[]
  product_shop_id: number
  product_shop: string
  product_brand: string
  product_brand_url: string
  product_category: string
}