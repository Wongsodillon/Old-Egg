import axios from "axios"

const baseUrl = "http://localhost:8080"

export const getMyWishlist = async (id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/my-wishlist/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getPublicWishlist = async (id: any) => {
  try {
    console.log(id)
    const response = await axios.get(`${baseUrl}/public-wishlist/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getFollowedWishlist = async (id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/followed-wishlist/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getWishlistDetail = async (id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/wishlist-detail/${id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const followWishlist = async (id: any, user_id: any) => {
  try {
    const response = await axios.post(`${baseUrl}/follow-wishlist/${id}/${user_id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const unfollowWishlist = async (id: any, user_id: any) => {
  try {
    const response = await axios.post(`${baseUrl}/unfollow-wishlist/${id}/${user_id}`);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const removeProduct = async (id: any, product_id: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/remove-product-from-wishlist/${id}/${product_id}`);
    console.log(response.data);
    return true;
  }
  catch (error) {
    console.log(error);
    return false
  }
}

export const duplicateWishlist = async (id: any, user_id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/duplicate-wishlist/${id}/${user_id}`);
    console.log(response.data);
    return true;
  }
  catch (error) {
    console.log(error);
  }
}

export const createWishlist = async ({ id, name, privacy }: any) => {
  try {
    const response = await axios.post(`${baseUrl}/create-wishlist`, { 
      user_id: id,
      wishlist_name: name, 
      privacy: privacy,
      wishlist_rating: 0,
      wishlist_rating_count: 0,
      followers: []
    });
    console.log(response.data);
    return true;
  }
  catch (error) {
    console.log(error);
  }
}

export const addProductToWishlist = async ({ wishlist_id, id, qty }: any) => {
  try {
    const response = await axios.post(`${baseUrl}/add-product-to-wishlist`, {
      wishlist_id: parseInt(wishlist_id),
      product_id: parseInt(id),
      quantity: parseInt(qty)
    });
    console.log(response.data);
    return true;
  }
  catch (error) {
    console.log(error);
  }
}

export const removeAllProductsFromWishlist = async (id: any) => {
  
}