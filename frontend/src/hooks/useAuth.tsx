import { useState, useEffect } from 'react';
import axios from "axios"

type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  location: string;
}

export const useAuth = () => {
  
    const [user, setUser] = useState({} as User)
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getauth", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      // console.log("useAuth called")
      fetchData();
    }, []);
  
    return user
}