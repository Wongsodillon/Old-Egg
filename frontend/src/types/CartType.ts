export type Cart = {
  user_id: number
  product_id: number
  product_name : string
  product_price : number
  shipping_price : number
  product_url: string
  quantity : number
}

export type AddCart = {
  user_id: number
  product_id: number
  quantity: number
}