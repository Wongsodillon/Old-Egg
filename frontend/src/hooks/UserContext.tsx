import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'

const UserContext = createContext({} as any);

type User = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const UserContextProvider = ({ children }: { children: any }) => {

  const [user, setUser] = useState<User>({} as User)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/getauth", { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )

}
export function useAuthUser() {
  return useContext(UserContext)
}

export default UserContextProvider;