import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { machineData } from '../services/api';
import { useSelector } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.login.token);
    const [selectedValue, setValue] = useState("all");
    const navigate = useNavigate();

    async function fetchData() {
        setLoading(true);
        console.log(token)
        const res = await apiConnector("GET", `${machineData.dashboard}?token=${token}`);
        setLoading(false);
        if (loading === false) {
            setMainData(res.data.machine)
            setData(res.data.machine);
            console.log(res.data.machine);
        }
    }

    function estCost(rul) {
        let base_cost = 1000
        let rate_of_increase = 20
        let remaining_life = 100 - rul
        let maintenance_cost = base_cost + rate_of_increase * remaining_life
        return maintenance_cost
    }

    useEffect(() => {
        fetchData();
    }, [])

    function changeHandeler(event) {
        console.log(event.target.value)
        if (event.target.value === "all") {
            setData(mainData);
            return;
        }
        setData(mainData.filter((machine) => {
            return machine.currentCondition === event.target.value;
        })
        )
    }


    return (
        <div className='mt-32 flex flex-col gap-8 w-[80%] mx-10'>
            <div>
                <h1 className='text-2xl font-bold'>Welcome To Dashboard</h1>
                <p className='text-lg'>Here you can manage your <span className='bg-green-500 rounded-md text-white p-1 text-sm'>Registered Machines</span></p>
            </div>
            <div className='w-full'>
                <form action="" className='relative w-full'>
                    <input type="text" placeholder='Search Machines...' className='border-slate-200 border rounded-md px-8 py-1 placeholder:text-green-400 w-[30%]' />
                    <select name="dropdown" id="" value={selectedValue} onChange={changeHandeler} className=' appearance-none  bg-white border w-[6rem] ml-5 border-slate-200 hover:border-gray-500 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline'>
                        <option value="all" className=''>Filter</option>
                        <option value="0">Status : Fresh</option>
                        <option value="1">Status : Half Life</option>
                        <option value="2">Status : Worst</option>
                    </select>
                    <button className='absolute left-1  top-[8px]'><CiSearch className='font-bold text-green-500 text-xl' /></button>
                </form>
            </div>
            <div className=''>
                <table className="min-w-full bg-white dark:bg-zinc-800">
                    <thead>
                        <tr className='w-full border-b'>
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">Name of the Machine</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Life Cycles Remmaining</th>
                            <th className="text-left p-2">Est. Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((machine) => (



                            <tr className="border-b" onClick={() => { navigate(`/machine/${machine._id}`) }}>
                                <td className='p-2'>{machine.data.statusData.ID}</td>
                                <td className='p-2'>{machine.name}</td>
                                <td className='p-2'>{
                                    machine.currentCondition === "0" ? (<p className='border border-slate-200 font-bold text-green-700 w-16 px-2 rounded-md bg-green-300'>Fresh</p>) : (
                                        machine.currentCondition === "1" ? (<p className='border border-slate-200 font-bold text-yellow-400 bg-yellow-200 w-16 px-2 rounded-md'>Half</p>) : (<p className='border border-slate-200 font-bold text-red-700 bg-red-300 w-16 px-2 rounded-md'>Worst</p>)
                                    )
                                }</td>
                                <td className='p-2'>{machine.LifeCycle}</td>
                                <td className='p-2'>${estCost(machine.LifeCycle)}</td>
                            </tr>


                        ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
