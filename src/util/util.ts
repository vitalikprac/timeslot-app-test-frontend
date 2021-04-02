import {SERVER_URL} from "../App";
import {WeekHours} from "../components/SelectTimeSlot/SelectTimeSlot";


export const fetchPostTimeSlot = async (token:string,timeSlot:WeekHours):Promise<void>=>{
    await fetch(`${SERVER_URL}/timeslot`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({timeSlot})
    });
}

export const fetchGetTimeSlot = async (token:string)=>{
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/timeslot`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

