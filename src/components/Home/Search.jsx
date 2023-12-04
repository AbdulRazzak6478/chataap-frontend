import React from 'react'
import '../../styles/Search.css'
import { BiSearch } from 'react-icons/bi'
const Search = () => {
  return (
    <>
       {/* <div className="search">
           <BiSearch />
           <input type="text" placeholder='Search ...' autoFocus />
       </div> */}
                <div className="field headSearch">
                        {/* <div >Email* </div> */}
                        <BiSearch />
                        <input type="search" id="email"  placeholder='Enter Your Email ...' required />
                        {/* <div className={`solve`}>Email* is required.</div> */}
                    </div>
    </>
  )
}

export default Search