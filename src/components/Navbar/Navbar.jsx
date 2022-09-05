import React from "react";
import { GrSearch,GrRefresh } from "react-icons/gr";

function Navbar() {
  return (
    <div className="flex flex-row justify-center items-center space-x-10">
      <span>Taskz</span>
      <div className="flex flex-row">
        <GrSearch size={50}/>
        <input type="text" name="search" placeholder="Search" />
      </div >
      <div className="flex flex-row">
            <GrRefresh size={50}/>
            <span className="flex justify-center items-center"> 
                <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&w=1000&q=80" 
                className="rounded-full h-10 w-10"
                alt="user-img" />
            </span>
      </div>
    </div>
  );
}

export default Navbar;
