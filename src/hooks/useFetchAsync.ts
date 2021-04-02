import { useState } from "react";
import {WeekHours} from "../components/SelectTimeSlot/SelectTimeSlot";

type UseAuthReturnType = [boolean,string|null,any,(weekHours:WeekHours,token:string)=>void]

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const useFetchAsync = ():UseAuthReturnType=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string|null>(null);
    const [data,setData] = useState({});

    const fetchAsync = async(weekHours:WeekHours,token:string)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${SERVER_URL}/timeslot`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({timeslot: weekHours})
            });
            const data = await response.json();
            if (data.error){
                setError(data.message);
            }else {
                setData(data);
            }
        }catch(e){
            console.error(e);
            setError(e.message);
        }
        setLoading(false);
    }

    return [loading,error,data,fetchAsync];
}
