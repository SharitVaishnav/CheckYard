import React, { useState } from 'react';
import { apiConnector } from '../services/apiConnector';
import { data , mail } from '../services/api';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { parseCsvData,changeHandeler } from '../redux/machineSlice';
import { handleDragOver,handleDragLeave,handleDragEnter ,setDragging } from '../redux/dragSlice';
import { GoFileSymlinkFile } from "react-icons/go";
import { GoAlertFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const MachineRegister = () => {

    const dispatch = useDispatch();
    const { dragging } = useSelector((state) => state.drag)
    const bodyData = useSelector( (state) => state.machine )
    const [loading,setLoading] = useState(false);
    const [fileOrNot,setFileOrNot] = useState(false);
    const [popUp,setPopUp] = useState(false);

    function fileHandeler(event){
        let files = event.target.files || event.dataTransfer.files;
        console.log(1);
        if (files.length === 0) {
            setFileOrNot(false);
            return;
        }

        const reader = new FileReader();
        let index = 0;

        const readFile = () => {
            if (index >= files.length) {
                setFileOrNot(true);
                return;
            }

            const file = files[index];
            reader.onload = function (e) {
                dispatch(parseCsvData(e.target.result));
                index++;
                readFile(); // Continue with the next file
            };

            reader.readAsText(file);
        };

        readFile();
    };

    function dragHandeler(data){
        let file = data;
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                dispatch(parseCsvData(event.target.result));
            };
            reader.readAsText(file);
        }
        setFileOrNot(true);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setDragging(false));
        const files = e.dataTransfer.files;
        for(let index = 0;index<files.length;index++){
            const file = files[index];
            if (file.type === "text/csv") {
                 dragHandeler(file);
            } else {
                 alert("Please upload a CSV file.");
            }       
        }    
        }

    async function submitHandeler(e){
        e.preventDefault();
        if(!fileOrNot){
            toast.error("Upload Your File First");
            return;
        }
        setLoading(true);
        const toast_id = toast.loading("Registering Your Machine");
        console.log(bodyData);
        const res = await apiConnector("POST",data.dataApi,bodyData);
        setLoading(false);
        if(!loading){
           console.log(res); 
           if(res.data.currentCondition === 2){ 
            setPopUp(true);
            console.log("mail sent")
            const mailSent = await apiConnector("POST", mail.mailApi,bodyData)
            }
        } 
            
        res.data.message === "success" && loading === false ? (toast.success("Your Machine is Registered",{id : toast_id})) : (toast.error("Machine Registeration failed",{id : toast_id}));
        setFileOrNot(false);
    }


  return (
    <div className='mt-32 flex flex-col items-center gap-1 relative'>
        <div className='absolute top-48'>
        {
            popUp ? (<div className='flex flex-col justify-center items-center border border-gray-500 rounded-lg shadow-md gap-2 px-8 py-5 relative bg-white'>
                <GoAlertFill className='text-red-500 text-7xl'/>
                <h1 className='text-2xl font-bold'>Alert!</h1>
                <h3 className='text-lg'>Your machine requires immediate maintenance.</h3>
                <h3 className='text-lg'>Kindly check your email for furthur details.</h3>
                <button onClick={() => setPopUp(false)}><IoCloseOutline  className='absolute top-3 right-3 text-2xl '/></button>
            </div>) : (<></>)
        }
       </div>
        <div className='w-[24rem] mx-auto'>
            <h1 className='text-3xl font-semibold text-center'>Register Your Machine Here</h1>
            <p className='text-center text-lg'>(Upload the files in their respective boxes)</p>
            <form onSubmit={(e) => submitHandeler(e)} className='mt-16'>
                <label htmlFor="name" className='font-bold'>Enter name for your <span className='font-semibold text-green-500'>Machine</span></label>
                <br />    
                <input type="text" id='name' placeholder = "Enter Name" onChange={(e) => dispatch(changeHandeler(e))} className='mt-5 rounded-md  border focus:border-none focus:outline-none border-slate-400 focus:outline-blue-400 focus:outline-4 transition duration-300 w-[76%] h-10 p-2'/> 
                <button className='ml-4 h-10 bg-green-400 text-white px-3 py-1 rounded-md' type='submit'>Submit</button>
            </form>  
        </div>

        <div className='flex mt-5 w-[80%] mx-auto mb-10 gap-10 justify-center'>
            <div className='w-[36rem] h-[42rem] rounded-md border-2 border-gray-300 flex flex-col'>
                <h1 className='text-center font-semibold text-xl mt-5'>Upload File 1</h1>
                <div onDragEnter={(e) => dispatch(handleDragEnter(e))}
                onDragLeave={(e) => dispatch(handleDragLeave(e))}
                onDragOver={(e) => dispatch(handleDragOver(e))}
                onDrop={handleDrop} className = {`w-[80%] h-[75%] mx-auto mt-10 border-4 border-dashed border-green-300 flex flex-col items-center justify-center ${dragging ? `bg-black` : `bg-slate-100`} bg-slate-100`}>
                    {
                        fileOrNot ? (<GoFileSymlinkFile className='text-7xl text-green-400'/>) : (<img src="Upload icon.png" alt="icon" />)
                    }
                    
                    <span>{
                        dragging ? (<span>Drop Your Files Here or</span>) : 
                    ( fileOrNot ? (<span>Upload The Selected Files</span>) :
                    (<span>Drag and Drop your File or</span>))}</span>
                    <label htmlFor="csv" className='text-semibold text-green-500'>Browse</label>
                    <input type="file" id='csv' className='invisible' onChange={ (event) => fileHandeler(event) } multiple/>
                </div> 
                <form onSubmit={(e) => submitHandeler(e)} className='w-[80%] mt-5 mx-auto'>
                <button className='bg-green-400 text-white w-full rounded-md py-2' type='submit'>Upload Files</button></form>
            </div>
            

            {/* <div className='w-[36rem] h-[42rem] rounded-md border-2 border-gray-300 flex flex-col'>
                <h1 className='text-center font-semibold text-xl mt-5'>Upload File 2</h1>
                <div onDragEnter={(e) => dispatch(handleDragEnter(e))}
                onDragLeave={(e) => dispatch(handleDragLeave(e))}
                onDragOver={(e) => dispatch(handleDragOver(e))}
                onDrop={handleDrop} className = {`w-[80%] h-[75%] mx-auto mt-10 border-4 border-dashed border-green-300 flex flex-col items-center justify-center ${dragging ? `bg-black` : `bg-slate-100`} bg-slate-100`}>
                    {
                        fileOrNot ? (<GoFileSymlinkFile className='text-7xl text-green-400'/>) : (<img src="Upload icon.png" alt="icon" />)
                    }
                    
                    <span>{
                        dragging1 ? (<span>Drop Your Files Here or</span>) : 
                    ( fileOrNot1 ? (<span>Upload The Selected Files</span>) :
                    (<span>Drag and Drop your File or</span>))}</span>
                    <label htmlFor="csv" className='text-semibold text-green-500'>Browse</label>
                    <input type="file" id='csv' className='invisible' onChange={ (event) => fileHandeler(event) }/>
                </div> 
                <form onSubmit={(e) => submitHandeler(e)} className='w-[80%] mt-5 mx-auto'>
                <button className='bg-green-400 text-white w-full rounded-md py-2' type='submit'>Upload Files</button></form>
            </div>             */}

            
        </div>
        
    </div>
  )
}

export default MachineRegister;
