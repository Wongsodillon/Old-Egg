export type WishlistBody = {
  id: number;
  name: string
  user_name: string
  product_id: number[]
  product_name: string[]
  product_url: string[]
  total_price: number
  privacy: string
  created_at: string
}

export type WishlistDetails =  {
  id: number;
  name: string
  user_id: number
  user_name: string
  privacy: string
  product_id: number
  product_name: string
  product_url: string
  product_price: number
  product_shipping_price: number
  product_rating: number
  product_rating_count: number
  brand_name: string
  brand_url: string
  quantity: number
  date_added: string
}