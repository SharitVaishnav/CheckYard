import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logoutHandeler} from '../redux/loginSlice'

const Navbar = () => {

  const dispatch = useDispatch();
  const expire = useSelector( (state) => state.login.expiration )
  if(expire < Date.now()){
    dispatch(logoutHandeler());
  }
  const token = useSelector( (state) => state.login.token);
  

  return (
    <div className='relative'>
      <nav className='flex flex-wrap justify-between items-center bg-green-500 text-white p-4 fixed top-0 w-[100%] z-10'>
      <div>
        <img src="checkyard logo.png" alt="Logo" className='h-10 w-10 mr-2 max-[640px]:h-7 max-[640px]:w-7 max-[640px]:mt-1'/>
        <span className='font-bold text-xl max-[640px]:text-sm'>CHECHYARD</span>
      </div>
      <div>
        <ul className='flex flex-wrap gap-x-10'>
         <div className='flex flex-col group font-bold'> <li className='p-3 max-[640px]:p-0'><Link to = "/">Home</Link></li> <div className='rounded-full w-full h-1 group-hover:bg-white transition duration-300'></div></div>
         <div className='flex flex-col group font-bold'> <li className='p-3 max-[640px]:p-0'><Link to = "/about">About Us</Link></li> <div className='rounded-full w-full h-1 group-hover:bg-white transition duration-300'></div></div>
         <div className='flex flex-col group font-bold'><div><li className='p-3 max-[640px]:p-0'><Link to = "/admin">Admin</Link></li> <div className='rounded-full w-full h-1 group-hover:bg-white transition duration-300'></div></div></div>
         <div className='flex flex-col group font-bold'>{ 
         token ? (<div className='group'><li><button className='group-hover:bg-white group-hover:text-green-500 transition duration-300 p-3 font-bold rounded-lg max-[640px]:p-2'>Register</button></li>
         <div className='absolute invisible group-hover:visible bg-white z-30 rounded-lg w-[10%] flex flex-col gap-2 justify-evenly top-[75px] right-3 max-[640px]:w-[30%] max-[640px]:top-[100px]'>
          <Link to = "/machineRegister"><p className='text-gray-600 text-center font-bold hover:bg-gray-600 hover:text-white rounded-lg transition duration-300 p-1'>Machine</p></Link>
          <Link to= "/signup"><p className='text-gray-600 text-center font-bold hover:bg-gray-600 hover:text-white rounded-lg transition duration-300 p-1'>User</p></Link>
          </div></div>) : 
          (<div> <li className='p-3 max-[640px]:p-0'><Link to = "/signup">Sign Up</Link></li> <div className='rounded-full w-full h-1 group-hover:bg-white transition duration-300'></div> </div>)
         } 
          </div>
         
          <div className='flex flex-col group font-bold '>{ 
         token ? (<div className='p-2 max-[640px]:p-0'><img src="Avatar.png" alt="avatar" className='h-10 w-10'/>
           <div className='absolute invisible group-hover:visible bg-white z-30 rounded-lg w-[10%] flex flex-col gap-2 justify-evenly top-[75px] right-3 max-[640px]:w-[30%] max-[640px]:top-[100px]'>
          <Link to = "/dashboard"><p className='text-gray-600 text-center font-bold hover:bg-gray-600 hover:text-white rounded-lg transition duration-300 p-1'>Dashboard</p></Link>
          <Link to = "/"><p className='text-gray-600 text-center font-bold hover:bg-gray-600 hover:text-white rounded-lg transition duration-300 p-1' onClick={() => dispatch(logoutHandeler())}>Logout</p></Link>
         </div></div>) : 
          (<div><li className='p-3 max-[640px]:p-0'><Link to = "/login">Login</Link></li> <div className='rounded-full w-full h-1 group-hover:bg-white transition duration-300'></div></div>)
         } 
          </div>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar;




