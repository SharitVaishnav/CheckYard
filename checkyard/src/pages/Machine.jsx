import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { apiConnector } from '../services/apiConnector'
import { graph } from '../services/api'


const Machine = () => {

    const [imageSrc, setImageSrc] = useState('');
    const {machineId} = useParams();
    const [loading,setLoading] = useState(true);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    const [w, setW] = useState(0);
    const [id, setId] = useState(1);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);  
        const res = await apiConnector("GET", `${graph.graphApi}?machineId=${machineId}`);
        setLoading(false);
  
        if (res && res.data && res.data.machineData) {
          const { cycles, T24, ID,T30,T50 } = res.data.machineData.data.statusData;
          setX(cycles);
          setY(T24);
          setId(ID);
          setZ(T30);
          setW(T50)
        }
      };
  
      fetchData();
    }, [machineId]);
  
    useEffect(() => {
      if (x !== 0 && y !== 0) {
        fetch(`http://127.0.0.1:5000/plot?id=${id}&x=${x}&y=${y}&w=${w}&z=${z}`)
          .then(response => response.blob())
          .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageSrc(imageObjectURL);
            console.log(imageObjectURL);
          });
      }
    }, [x, y,w,z, id]);
      

  return (
    <div id="graph-container" className='mt-40'>
        {imageSrc && <img src={imageSrc} alt="Plot" />}
    </div>
  )
}

export default Machine
