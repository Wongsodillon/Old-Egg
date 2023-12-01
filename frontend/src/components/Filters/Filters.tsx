import Switch from "../Switch/Switch";
import { IoMdArrowDropup } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import './Filters.scss';
import Rating from "../Rating/Rating";

const Filters = () => {
  return ( 
    <aside className='left'>
      <div className='switch-container'>
        <p className='gray-text'>Free Shipping</p>
        <Switch/>
      </div>
      <div className="filters-container">
        <div className='title-container flex space-between items-center'>
          <p className='filter-title'>Department</p>
          <IoMdArrowDropup size={30}/>
        </div>
        <div className="filters flex items-center">
          <FaChevronLeft size={15}/>
          <p className="bold">Any Category</p>
        </div>
        <div className="filters flex items-center">
          <FaChevronLeft size={15}/>
          <p className="bold">Portable Electronic Devices</p>
        </div>
        <div className="filters">
          <p className="filter-link">Headphones & Accessories</p>
        </div>
      </div>
      <div className='filters-container'>
        <div className='title-container flex space-between items-center'>
          <p className='filter-title'>Seller</p>
          <IoMdArrowDropup size={30}/>
        </div>
        <div className='filters flex-col flex items-start'>
          <label htmlFor="">
            <input type="checkbox" name='forCheckbox'/> Check my ass nigga
          </label>
          <label htmlFor="">
            <input type="checkbox" name='forCheckbox'/> Check my ass nigga
          </label>
          <label htmlFor="">
            <input type="checkbox" name='forCheckbox'/> Check my ass nigga
          </label>
        </div>
      </div>
      <div className='filters-container'>
        <div className='title-container flex space-between items-center'>
          <p className='filter-title'>Useful Links</p>
          <IoMdArrowDropup size={30}/>
        </div>
        <div className='filters flex-col flex items-start'>
          <label htmlFor="">
            <input type="checkbox" name='forCheckbox'/> Clearance Item
          </label>
        </div>
      </div>
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
  );
}
 
export default Filters;