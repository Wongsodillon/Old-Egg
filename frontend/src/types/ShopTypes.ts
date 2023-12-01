export type Shop = {
  name: string
  id: number
  rating: number
  rating_count: number
  sales: number
  shop_url: string
  shop_banner_url: string
  about_us: string
  email: string
  followers: number
  product_accuracy: number
  satisfaction: number
  ontime_delivery: number
}

export type ShopReview = {
  id: number
  user_name: string
  shop_id : number
  user_id: number
  review: string
  title: string
  rating: number
  ontime_delivery: number
  product_accuracy: number
  satisfaction: number
  date: string
}