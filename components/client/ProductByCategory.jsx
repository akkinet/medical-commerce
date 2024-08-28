'use client'
import React , {useState} from 'react'
import Link from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import Image from 'next/image';

const ProductByCategoryPage = ({data}) =>{
  const [arrow, setArrow] = useState(true);
  const [arrow1, setArrow1] = useState(true);
  const [arrow2, setArrow2] = useState(true);
  const [products, setProducts] = useState(data.productList);
  const [category, setCategory] = useState(data.category);
  const [brands, setBrands] = useState(data.brandList);
  const [filters, setFilters] = useState({
      prescription: null,
      brand: [],
      price: null
  });

  const handleFilterChange = async (e) => {
      const { checked, name, value } = e.target;
      const urlSearchParams = new URLSearchParams(filters);

      if (name === "prescription") {
          setFilters({ ...filters, [name]: !filters.prescription });
          urlSearchParams.set(name, !filters.prescription)
      } else if (name === "price") {
          setFilters({ ...filters, [name]: value });
          urlSearchParams.set(name, value)
      } else {
          if (checked) {
              setFilters({ ...filters, [name]: filters[name].concat(value) });
              urlSearchParams.set(name, filters[name].concat(value))
          } else {
              const temp = [...filters[name]];
              temp.splice(temp.indexOf(value), 1);
              setFilters({ ...filters, [name]: temp });
              urlSearchParams.set(name, temp)
          }
      }

      const queryString = urlSearchParams.toString();
      const res = await fetch(`/api/product/${category._id}?${queryString}`);
      const data = await res.json();
      setProducts(data.productList);
      if (brands.length === 0)
          setBrands(data.brandList);
      setCategory(data?.category);
  };

  const clearAllFilters = async () => {
      const reset = {
          prescription: null,
          brand: [],
          price: null
      }
      setFilters(reset);
      const urlSearchParams = new URLSearchParams(reset);
      const queryString = urlSearchParams.toString();
      const res = await fetch(`/api/product/${category._id}?${queryString}`);
      const data = await res.json();
      setProducts(data.productList);
      if (brands.length === 0)
          setBrands(data.brandList);
      setCategory(data?.category);
  };

  const isFilterActive = () => {
      return filters.prescription !== null || filters.brand.length > 0 || filters.price !== null;
  };

  const renderSkeletonFilters = () => (
      <div className="leftcontainer lg:h-auto lg:w-1/4 p-4 mt-2 bg-gray-100 rounded-xl shadow-md animate-pulse">
          <div className='h-10 bg-gray-300 rounded mb-4'></div>
          <hr className='border-2 border-gray-300 mb-2' />
          <div className='h-6 bg-gray-300 rounded mb-4'></div>
          <hr className='border-2 border-gray-300 my-2' />
          <div className="dropdowncontainer font-bold mb-4">
              <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <div className='h-6 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-6 bg-gray-300 rounded w-1/4'></div>
              </div>
              <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                  <div className="inner flex items-center mb-2 h-6 bg-gray-300 rounded"></div>
                  <div className="inner flex items-center mb-2 h-6 bg-gray-300 rounded"></div>
              </div>
          </div>
          <div className="dropdowncontainer font-bold mb-4">
              <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <div className='h-6 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-6 bg-gray-300 rounded w-1/4'></div>
              </div>
              <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                  {[...Array(3)].map((_, i) => (
                      <div className="inner flex items-center mb-2 h-6 bg-gray-300 rounded" key={i}></div>
                  ))}
              </div>
          </div>
          <div className="dropdowncontainer font-bold mb-4">
              <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <div className='h-6 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-6 bg-gray-300 rounded w-1/4'></div>
              </div>
              <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                  {[...Array(3)].map((_, i) => (
                      <div className="inner flex items-center mb-2 h-6 bg-gray-300 rounded" key={i}></div>
                  ))}
              </div>
          </div>
          <div className='h-10 bg-gray-300 rounded mt-4'></div>
      </div>
  );

  const renderSkeletonProducts = () => (
      <div className="rightcontainer lg:h-fit lg:w-3/4 lg:p-1 lg:pt-0 grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {[...Array(6)].map((_, i) => (
              <div className="p-2 flex flex-col" key={i}>
                  <div className="border shadow-xl shadow-teal-200/20 border-teal-200 rounded-lg overflow-hidden h-full flex flex-col items-center justify-between">
                      <div className="h-48 w-full bg-gray-300"></div>
                      <div className="p-4 flex-grow flex flex-col items-center justify-between bg-gray-50 w-full">
                          <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>
                          <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  );

  return (
      <div className='text-black mt-24 lg:flex lg:mx-20 '>
          {!data.hasOwnProperty("category") ? renderSkeletonFilters() : (
              <div className="leftcontainer lg:h-auto lg:w-1/4 p-4 mt-2 bg-gray-100 rounded-xl shadow-md ">
                  <h1 className='text-4xl font-semibold mb-4 capitalize'>{category.name}</h1>
                  <hr className='border-2 border-teal-400 mb-2' />
                  <div className="flex justify-between items-center h-10">
                      <h3 className="text-2xl font-semibold">FILTER :</h3>
                      {isFilterActive() && (
                          <button
                              className="text-red-600"
                              onClick={clearAllFilters}
                          >
                              Clear filters
                          </button>
                      )}
                  </div>
                  <hr className='border-2 border-teal-400 my-2' />
                  <div className="dropdowncontainer font-bold mb-4">
                      <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                          <p>Prescription Required</p>
                          <button className="dropdown-button" onClick={() => setArrow(!arrow)}>
                              {arrow ? <FaArrowDown /> : <FaArrowUp />}
                          </button>
                      </div>
                      {!arrow && (
                          <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                              <div className="inner flex items-center mb-2">
                                  <input
                                      type="radio"
                                      name="prescription"
                                      id="yes"
                                      className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                      checked={filters.prescription === true}
                                      onChange={(e) => handleFilterChange(e)}
                                  />
                                  <label htmlFor="yes" className='ml-4 text-md font-light'>Yes</label>
                              </div>
                              <div className="inner flex items-center mb-2">
                                  <input
                                      type="radio"
                                      name="prescription"
                                      id="no"
                                      className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                      checked={filters.prescription === false}
                                      onChange={(e) => handleFilterChange(e)}
                                  />
                                  <label htmlFor="no" className='ml-4 text-md font-light'>No</label>
                              </div>
                          </div>
                      )}
                  </div>
                  <div className="dropdowncontainer font-bold mb-4">
                      <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                          <p>Brand</p>
                          <button className="dropdown-button" onClick={() => setArrow1(!arrow1)}>
                              {arrow1 ? <FaArrowDown /> : <FaArrowUp />}
                          </button>
                      </div>
                      {!arrow1 && (
                          <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                              {brands.map(brand => (
                                  <div className="inner flex items-center mb-2" key={brand}>
                                      <input
                                          type="checkbox"
                                          name="brand"
                                          value={brand}
                                          className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                          checked={filters.brand.includes(brand)}
                                          onChange={(e) => handleFilterChange(e)}
                                      />
                                      <label htmlFor="brand" className='ml-4 text-md font-light'>{brand}</label>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
                  <div className="dropdowncontainer font-bold mb-4">
                      <div className="dropdown-container flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                          <p>Price Range</p>
                          <button className="dropdown-button" onClick={() => setArrow2(!arrow2)}>
                              {arrow2 ? <FaArrowDown /> : <FaArrowUp />}
                          </button>
                      </div>
                      {!arrow2 && (
                          <div className="dropdown-menu flex flex-col bg-white p-3 mt-2 rounded-lg shadow-sm">
                              <div className="inner flex items-center mb-2">
                                  <input
                                      type="radio"
                                      name="price"
                                      id="low"
                                      className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                      value='{"$lt":2000}'
                                      checked={filters.price === '{"$lt":2000}'}
                                      onChange={(e) => handleFilterChange(e)}
                                  />
                                  <label htmlFor="low" className='ml-4 text-md font-light'> less than $2000 </label>
                              </div>
                              <div className="inner flex items-center mb-2">
                                  <input
                                      type="radio"
                                      name="price"
                                      id="medium"
                                      value='{"$gte":2000,"$lt":5000}'
                                      className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                      checked={filters.price === '{"$gte":2000,"$lt":5000}'}
                                      onChange={(e) => handleFilterChange(e)}
                                  />
                                  <label htmlFor="medium" className='ml-4 text-md font-light'> equal or more than $2000 </label>
                              </div>
                              <div className="inner flex items-center mb-2">
                                  <input
                                      type="radio"
                                      name="price"
                                      id="high"
                                      value='{"$gte":5000}'
                                      className='border-2 border-gray-300 accent-teal-400 h-4 w-4'
                                      checked={filters.price === '{"$gte":5000}'}
                                      onChange={(e) => handleFilterChange(e)}
                                  />
                                  <label htmlFor="high" className='ml-4 text-md font-light'> more than $5000 </label>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          )}
          {!data.hasOwnProperty("category") ? renderSkeletonProducts() : (
              <div className="rightcontainer lg:h-fit lg:w-3/4 lg:p-9 lg:pt-0 grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
                  {products.length ? products.map((prod) => (
                      <div className="p-2 flex flex-col" key={prod.id}>
                          <Link href={`/product/${prod.id}`}>
                              <div className="border shadow-xl shadow-teal-200/20 border-teal-200 hover:shadow-teal-300/40 hover:border-2 rounded-lg overflow-hidden h-72 flex flex-col items-center justify-between cursor-pointer transition-transform transform hover:scale-105">
                                  <img
                                      className="h-48 w-full object-contain object-center p-4"
                                      src={prod.images[0]}
                                      alt={prod.title}
                                  />
                                  <div className="p-4 flex-grow flex flex-col items-center justify-between bg-gray-200 w-full">
                                      <h1 className="title-font text-md font-medium text-gray-900 text-center mb-1">
                                          {prod.title}
                                      </h1>
                                      <p className='text-md text-center bg-teal-400 text-white py-2 w-full rounded-lg shadow-sm'>$ {prod.price}</p>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  )) : (
                    <div className="text-center  lg:w-[60vw] lg:h-[50vh] mt-5 flex items-center justify-center animate-pulse"><Image src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/wlplpvutch0tan3kocst"  height={600} width={500}/></div>
                  )}
              </div>
          )}
      </div>
  );
};

export default ProductByCategoryPage