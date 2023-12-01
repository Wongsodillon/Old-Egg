import axios from "axios"

const baseUrl = "http://localhost:8080"

export const getAddress = async (user_id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/get-address/${user_id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getProviders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/delivery-providers`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getOrders = async (user_id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/get-orders/${user_id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}