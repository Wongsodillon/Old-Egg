import axios from "axios";

const baseUrl = "http://localhost:8080";

export const getFeaturedBrands = async () => {
  try {
    const response = await axios.get(`${baseUrl}/featured-brands`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/featured-products`);
    console.log(response.data)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

export const searchProducts = async (keyword: string) => {
  try {
    keyword = keyword.toLowerCase()
    const response = await axios.post(`${baseUrl}/search-products`, { keyword: keyword })
    console.log(response.data)
    return response.data
  }
  catch (error) {
    console.log(error)
  }
}

export const getProductsByShopID = async (shop_id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/shop-products/${shop_id}`)
    console.log(response.data)
    return response.data  
  } catch(error) {
    console.log(error)
  }
}

export const getProductByID = async (product_id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/product/${product_id}`)
    console.log(response.data)
    return response.data
  } catch(error) {
    console.log(error)
  }
}