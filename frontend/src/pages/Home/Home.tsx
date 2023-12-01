import { useState, useEffect } from 'react';
import { FaChevronRight } from "react-icons/fa";
import Carousel from '../../components/Carousel/Carousel';
import Featured from '../../components/Featured/Featured'
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import "./Home.scss"
import dummy from "../assets/dummyproduct1.jpg"

import { getCategories } from '../../api/ProductsAPI';

type Category = {
  id: number;
  category_name: string;
}

const Home = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  const user = useAuth()
  
  const images = [
    { src: "https://i.ibb.co/FYXFXwB/Screenshot-329.png", name: "Intel Core i9-14900K Desktop Processor1" },
    { src: "../assets/dummyproduct1.jpg", name: "Intel Core i9-14900K Desktop Processor3" }
  ]

  const recommended = [
    { src:"https://iili.io/Jn7dtd7.md.png", name: "GPUs / Video Graphics Card" },
    { src:"https://iili.io/Jn0Wvea.md.jpg", name: "Processors - Desktops" },
    { src:"https://iili.io/Jn0GAxV.md.jpg", name: "Desktop Computers" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpCategories = await getCategories()
        setCategories(tmpCategories)
      } catch (err) {
        console.error(err)
      }
    };
    
    fetchData()
  }, []);

  return ( 
    <>
      <main>
        <div className='carousel-container'>
          <Carousel/>
          <div className='category-container'>
            {categories.map(category => (
              <div className='category-item flex space-between items-center' key={category.id}>
                <p>{category.category_name}</p>
                <FaChevronRight/>
              </div>
            ))}
          </div>
          <div className='welcome-container'>
            <div className='welcome'>
              <p className='header'>HI, {user.name}</p>
              <p className='welcome-to-newegg'>Welcome to Newegg! Hope you enjoy shopping here today. If you have any comment or suggestion, please leave us feedback</p>
              <div className='acc-order flex'>
                <Link to="/account"><p>YOUR ACCOUNT</p></Link>
                <p>YOUR ORDERS</p>
              </div>
            </div>
            <div className='welcome'>
              <p className='header'>RECENTLY VIEWED ITEMS</p>
              <div className='items flex'>
                {images.map(img => (
                  <div className='item' key={img.name}>
                    <img src={dummy} alt='dummy'/>
                  </div>
                ))}
              </div>
            </div>
            <div className='welcome'>
              <p className='header'>RECOMMENDED CATEGORIES</p>
              <div className='items flex'>
                {recommended.map(img => (
                  <div className='item' key={img.name}>
                    <img src={img.src} alt='dummy'/>
                    <p className='item-name'>{img.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Featured/>
    </>
  );
}
 
export default Home;