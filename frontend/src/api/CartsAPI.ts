import axios from "axios"
const baseUrl = "http://localhost:8080";
import { AddCart } from "../types/CartType";

export const getCart = async (user_id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/get-cart/${user_id}`)
    console.log(response.data)
    return response.data
  } catch {
    console.log("error")
  }
}

export const removeProductFromCart = async (user_id: any, product_id: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/remove-product-from-cart/${user_id}/${product_id}`)
    console.log(response.data)
    return true
  } catch {
    console.log("error")
  }
}

export const removeAll = async (user_id: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/remove-all-products-from-cart/${user_id}`)
    console.log(response.data)
    return true
  } catch {
    console.log("error")
  }
}

export const addToCart = async ({ user_id, product_id, quantity }: AddCart) => {
  try {
    const response = await axios.post(`${baseUrl}/add-to-cart`, { user_id, product_id, quantity })
    console.log(response.data)
    return true
  } catch {
    console.log("error")
  }
}
