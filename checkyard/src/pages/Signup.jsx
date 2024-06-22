import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeHandeler } from '../redux/signupSclice';
import { apiConnector } from '../services/apiConnector';
import { signup } from '../services/api';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Signup = () => {

  const dispatch = useDispatch();
  const bodyData = useSelector( (state) => state.signup );
  const [loading,setLoading] = useState(false);
  const [see,setSee] = useState(false);

  async function submitHandeler(event){
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing Up...");
    
    console.log(bodyData);
    const data = await apiConnector("POST",signup.signupApi,bodyData);
    setLoading(false)
    data.data.message === "success" && loading === false ? (toast.success(("Registeration Successfull"),{id : toastId})) : (toast.error(("Email already registered"),{id : toastId}));
  }
  function seeHandeler(){
    see ? (setSee(false)) : setSee(true);
  }


  return (
    <div className=' h-screen flex justify-center items-center mt-20 max-[640px]:mt-40 mb-10'>
      <div className='flex flex-col justify-center items-center w-3/12 max-[640px]:w-6/12'>
        <h1 className='text-3xl font-bold mb-2 text-center'>Create an account</h1>
        <p className='text-center text-zinc-600 mb-6'>Enter the given details to sign up for this app</p>
        <form className='flex flex-col justify-center items-center w-full ' onSubmit={ (event) => submitHandeler(event) }>
          <input type="text" id='email' name='email' placeholder='email@gmail.com' onChange={(event) => {dispatch(changeHandeler(event))}} className='w-full p-3 rounded-lg mb-4 border-[1px] border-zinc-600 opacity-45 hover:border-[3px]' />
          <div className='w-full relative'>
          <input type = {see ? ("text") : ("password")} id='pass' name='password' placeholder='password' onChange={(event) => {dispatch(changeHandeler(event))}} className='w-full p-3 rounded-lg mb-4 border-[1px] border-zinc-600 opacity-45 hover:border-[3px]' />
          <div className='absolute right-4 top-3 text-2xl'>{ !see ? (<IoEye onClick={seeHandeler} className='opacity-50'/>) : (<IoEyeOff onClick={seeHandeler} className='opacity-50'/>) }</div>
          </div>
          <input type="text" id='uname' name='username' placeholder='username' onChange={(event) => {dispatch(changeHandeler(event))}} className='w-full p-3 rounded-lg mb-4 border-[1px] border-zinc-600 opacity-45 hover:border-[3px]'/>
          
          <button type='submit' className='bg-green-600 text-white w-full p-3 rounded-lg font-bold hover:bg-zinc-600 hover:text-green-500 transition duration-300 border-[1px] border-black'>Sign Up</button>
          <div className='flex w-full items-center gap-3 mt-4'><div className='w-[31%] h-[2px] bg-zinc-600 opacity-30'></div><span className='text-zinc-700'>or continue with</span><div className='w-[31%] h-[2px] bg-zinc-600 opacity-30'></div></div>
          <div className='w-full relative mt-4'><button className='w-full bg-green-100 text-zinc-700 p-3 rounded-lg flex items-center justify-center font-bold'>Google</button>
          <FcGoogle className = "absolute text-3xl top-2 left-3"/>
          </div>
          <p class="text-center text-zinc-500 text-sm mt-6">
By clicking continue, you agree to our <span class="text-zinc-700 underline">Terms of Service</span> and <span class="text-zinc-700 underline">Privacy Policy</span></p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
