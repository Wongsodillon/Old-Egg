import { useState, useEffect } from 'react';
import { IoMdArrowDropup } from 'react-icons/io';
import Rating from '../../components/Rating/Rating';
import { getPublicWishlist } from '../../api/WishlistsAPI';
import { WishlistBody } from '../../types/WishlistTypes';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import WishlistCard from '../../components/WishlistCard/WishlistCard';
import { compareDates } from "../../Util";
import "./PublicWishlist.scss"

const PublicWishlist = ({ id }: { id: any }) => {

  const itemsPerPage = 2;
  const [updatedLists, setUpdatedLists] = useState<WishlistBody[]>([]);
  const [filteredLists, setFilteredLists] = useState<WishlistBody[]>([]);
  const [lists, setLists] = useState<WishlistBody[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState('create_date')

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublicWishlist(id)
      setLists(response)
      setUpdatedLists(response)
    }
    fetchData()
  }, [])

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

  useEffect(() => {
    let updatedListsCopy = [...lists]

    setUpdatedLists(updatedListsCopy)
    setMaxPage(Math.ceil(updatedListsCopy.length / itemsPerPage))
    setCurrentPage(1)
    setCount(updatedListsCopy.length)
  }, [lists])

  const sortLists = (e: any) => {
    let sortedLists: WishlistBody[];
    if (e.target.value === 'create_date') {
      sortedLists = [...updatedLists].sort((a, b) => compareDates(a.created_at, b.created_at));
    } else if (e.target.value === 'price') {
      sortedLists = [...updatedLists].sort((a, b) => b.total_price - a.total_price);
    } else {
      sortedLists = [...updatedLists];
    }
    console.log(sortedLists)
    setUpdatedLists(sortedLists);
    setSort(e.target.value);
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    setFilteredLists(updatedLists.slice(start, end))
  }, [updatedLists, currentPage])

  return ( 
    <div className="flex gap-1">
      <aside className='left wishlist-filter'>
        <div className="filters-container">
          <div className='title-container flex space-between items-center'>
            <p className='filter-title'>Lists Ratings</p>
            <IoMdArrowDropup size={30}/>
          </div>
          <div className="filters flex-col flex items-start gap-1">
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <Rating rating={5} rating_count={-1} />
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <Rating rating={4} rating_count={-1} />
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <Rating rating={3} rating_count={-1} />
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <Rating rating={2} rating_count={-1} />
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <Rating rating={1} rating_count={-1} />
            </div>
          </div>
        </div>
        <div className="filters-container">
          <div className='title-container flex space-between items-center'>
            <p className='filter-title'>Lists Price</p>
            <IoMdArrowDropup size={30}/>
          </div>
          <div className="filters flex-col flex items-start gap-1">
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$0 - $10</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$10 - $25</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$25 - $50</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$50 - $100</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$100 - $200</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$200 - $500</p>
            </div>
            <div className='flex gap-0-5 items-start'>
              <input type="checkbox"/>
              <p>$500 - $1000</p>
            </div>
          </div>
        </div>
      </aside>
      <div className='public-wishlists-container flex flex-col full-width items-start'>
        <div className='wishlist-settings flex items-center space-between full-width'>
          <div className="wishlist-settings-left flex items-center gap-1">
            <p><span className='bold'>{count}</span> Lists</p>
            <div className='flex items-center gap-0-5'>
              <p className='bold'>Sort By:</p>
              <select name="sort" id="sort" onChange={sortLists} defaultValue={sort}>
                <option value="create_date">Create Date</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          <div className='wishlist-settings-right flex items-center gap-0-5'>
            <p className='bold'>Page:</p>
            <div className='flex items-center pagination-container'>
              <FaChevronLeft size={15} onClick={prevPage} style={{cursor: "pointer"}}/>
              <p> {currentPage} / {maxPage} </p>
              <FaChevronRight size={15} onClick={nextPage} style={{cursor: "pointer"}}/>
            </div>
          </div>
        </div>
        <div className='my-wishlist-container flex flex-col gap-2 items-start'>
          {filteredLists.map(list => {
            return (
            <WishlistCard wishlist={list} publicList={true}/>
            )})}
          </div> 
      </div>
    </div>
  );
}
 
export default PublicWishlist;