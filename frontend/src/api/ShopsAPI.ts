import axios from "axios";

const baseUrl = "http://localhost:8080";

export const getShopByID = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/shop/${id}`);
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getShopCategory = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/shop-categories/${id}`);
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getShopReview = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/shop-reviews/${id}`);
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}