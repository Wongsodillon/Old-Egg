import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Search.scss"
import Filters from '../../components/Filters/Filters';
import { searchProducts } from '../../api/ProductsAPI';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { ProductResult } from '../../types/ProductTypes';

const Search = () => {

  const { keyword: rawKeyword } = useParams()
  const keyword = rawKeyword || 'defaultKeyword'

  const [products, setProducts] = useState<ProductResult[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchProducts(keyword)
        setProducts(response)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [keyword])

  return ( 
    <>
      <div className="search-header flex flex-col items-start">
        <p className='search-info'>Home - Singapore <span>&gt;</span> <span className='search-keyword'>Search Results: {keyword}</span></p>
        <p className='keyword'>{`"${keyword}"`}</p>
      </div>
      <main className='flex margin-padding'>
        <ProductsGrid products={products} context={'search'}/>
      </main>
    </>
  );
}
 
export default Search;
