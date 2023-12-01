import { useState, useEffect } from 'react'
import { FaSearch,FaChevronRight, FaChevronLeft } from "react-icons/fa"
import { ProductResult } from '../../types/ProductTypes'
import Switch from "../Switch/Switch"
import { IoMdArrowDropup } from "react-icons/io"
import ShopCard from '../ShopCard/ShopCard'
import SearchCard from '../SearchCard/SearchCard'
import Rating from '../Rating/Rating'
import "./ProductsGrid.scss"


const ProductsGrid = ({ products, context }: { products: ProductResult[], context: string }) => {

  const itemsPerPage = 8
  const [updatedProducts, setUpdatedProducts] = useState<ProductResult[]>(products)
  const [filteredProducts, setFilteredProducts] = useState<ProductResult[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [shops, setShops] = useState<string[]>([])
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([])
  const [shopsFilter, setShopsFilter] = useState<string[]>([])
  const [count, setCount] = useState(products.length)
  const [sort, setSort] = useState('')

  useEffect(() => {
    const categories = products.map(product => product.product_category)
    const shops = products.map(product => product.product_shop)
    setCategories([...new Set(categories)])
    context == 'search' ? setShops([...new Set(shops)]) : ''
  }, [products])

  const nextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  
  const handleCategoryChange = (category: string) => {
    if (categoriesFilter.includes(category)) {
      setCategoriesFilter(categoriesFilter.filter(c => c != category))
    } else {
      setCategoriesFilter([...categoriesFilter, category])
    }
  }
  
  const handleShopChange = (shop: string) => {
    if (shopsFilter.includes(shop)) {
      setShopsFilter(shopsFilter.filter(s => s != shop))
    } else {
      setShopsFilter([...shopsFilter, shop])
    }
  }

  const searchWithin = (e: any) => {
    e.preventDefault()
    console.log('Form submitted')
    console.log(e.target) 
    console.log(e.currentTarget.elements)
  }
  const sortProducts = (e: any) => {
    setUpdatedProducts(applySorting([...updatedProducts], e.target.value))
  }

  const applySorting = (productsToSort: ProductResult[], sortType: string) => {
    setSort(sortType)
    if (sortType === 'relevance') {
      return productsToSort.sort((a, b) => (b.product_rating * b.product_rating_count) - (a.product_rating * a.product_rating_count))
    } 
    else if (sortType === 'rating') {
      return productsToSort.sort((a, b) => b.product_rating - a.product_rating)
    } 
    else if (sortType === 'highest_price') {
      return productsToSort.sort((a, b) => b.product_price - a.product_price)
    } 
    else if (sortType === 'lowest_price') {
      return productsToSort.sort((a, b) => a.product_price - b.product_price)
    } 
    else if (sortType === 'reviews') {
      return productsToSort.sort((a, b) => b.product_rating_count - a.product_rating_count)
    } 
    else {
      return productsToSort
    }
  }
  
  useEffect(() => {
    let updatedProductsCopy = [...products]

    if (shopsFilter.length !== 0) {
      updatedProductsCopy = updatedProductsCopy.filter(product => shopsFilter.includes(product.product_shop))
    } else if (categoriesFilter.length !== 0) {
      updatedProductsCopy = updatedProductsCopy.filter(product => categoriesFilter.includes(product.product_category))
    }

    updatedProductsCopy = applySorting(updatedProductsCopy, sort)

    setUpdatedProducts(updatedProductsCopy)
    setMaxPage(Math.ceil(updatedProductsCopy.length / itemsPerPage))
    setCount(updatedProductsCopy.length)
    setCurrentPage(1)
  }, [categoriesFilter, shopsFilter, products])
  
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    setFilteredProducts(updatedProducts.slice(start, end))
  }, [currentPage, updatedProducts])

  return ( 
    <>
      <aside className='left'>
        <div className='switch-container'>
          <p className='gray-text'>Free Shipping</p>
          <Switch/>
        </div>
        <div className="filters-container">
          <div className='title-container flex space-between items-center'>
            <p className='filter-title'>Categories</p>
            <IoMdArrowDropup size={30}/>
          </div>
          <div className="filters flex-col flex items-start gap-1">
            {categories.map(category => {
              return (
                <div className='flex gap-0-5 items-start' key={category}>
                  <input type="checkbox" onChange={() => handleCategoryChange(category)}/>
                  <label>{category}</label>
                </div>
            )})}
          </div>
        </div>
        {context === 'search' && shops.length != 0 ? <div className='filters-container'>
          <div className='title-container flex space-between items-center'>
            <p className='filter-title'>Seller</p>
            <IoMdArrowDropup size={30}/>
          </div>
          <div className='filters flex-col flex items-start gap-1'>
            {shops.map(shop => {
              return (
                <div className='flex gap-0-5 items-start' key={shop}>
                  <input type="checkbox" onChange={() => handleShopChange(shop)}/>
                  <label>{shop}</label>
                </div>
              )})}
          </div>
        </div> : ''}
        <div className="filters-container">
          <div className='title-container flex space-between items-center'>
            <p className='filter-title'>Customer Ratings</p>
            <IoMdArrowDropup size={30}/>
          </div>
          <div className="filters">
            <button className="customer-rating-button">
              <Rating rating={4} rating_count={-1} /> 
              <span> & Up</span>
            </button>
            <button className="customer-rating-button">
              <Rating rating={3} rating_count={-1} /> 
              <span> & Up</span>
            </button>
            <button className="customer-rating-button">
              <Rating rating={2} rating_count={-1} /> 
              <span> & Up</span>
            </button>
            <button className="customer-rating-button">
              <Rating rating={1} rating_count={-1} /> 
              <span> & Up</span>
            </button>
          </div>
        </div>
      </aside>
      <div className='right flex flex-col'>
        <div className='search-settings flex items-center space-between'>
          <div className='search-settings-left flex items-center'>
            <form>
              <div className="flex items-center search-within">
                <form onSubmit={searchWithin} className='flex items-center gap-1'>
                  <input type="text" name="search" placeholder="Search Within"/>
                  <div className="flex items-center justify-center">
                    <FaSearch size={15} className="search-icon"></FaSearch>
                  </div>
                </form>
              </div>
            </form>
            <div className='sort-by flex items-center gap-1'>
              <p className='gray-text nowrap'>Sort by</p>
              <select name="sort" id="sort" onChange={sortProducts} defaultValue={sort}>
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="highest_price">Highest Price</option>
                <option value="lowest_price">Lowest Price</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>
          </div>
          <div className='search-settings-right flex items-center'>
            <p className='gray-text how-many-items'>{count} Items</p>
            <div className='view-container flex items-center'>
              <p className='gray-text'>View</p>
              <div className='flex items-center pagination-container'>
                <FaChevronLeft size={15} onClick={prevPage} style={{cursor: "pointer"}}/>
                <p> {currentPage} / {maxPage} </p>
                <FaChevronRight size={15} onClick={nextPage} style={{cursor: "pointer"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className='products-grid'>
          {
            context === 'search' ? 
            filteredProducts.map(product => <SearchCard key={product.product_id} product={product}/>) : 
            filteredProducts.map(product => <ShopCard key={product.product_id} product={product}/>)
          }
        </div>
      </div>
    </>
  )
}
 
export default ProductsGrid