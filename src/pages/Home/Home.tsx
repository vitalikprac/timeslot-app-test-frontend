import React, {useContext, useState} from 'react';

import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {SelectTimeSlot, WeekHours} from '../../components/SelectTimeSlot/SelectTimeSlot';
import {useFetchAsync} from "../../hooks/useFetchAsync";
import {TokenContext} from "../../TokenContext";
import classes from './Home.module.scss';


const Home = () => {

    const history = useHistory();
    const [loading,error,data,fetchAsync] = useFetchAsync();
    const {setToken,token} = useContext(TokenContext);
    const [timeSlot,setTimeSlot] = useState({});

    const onSaveSelectTimeSlot = (weekHours:WeekHours)=>{
        fetchAsync(weekHours,token!);
    }

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/timeslot`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const {timeSlot} = await response.json();
            if (timeSlot){
                setTimeSlot(timeSlot);
            }
        })()
    },[])

    const onClickSignOut = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        history.push('/signIn');
    }

    return (
        <div className={classes.main}>
            <SelectTimeSlot timeSlot={timeSlot} onSave={onSaveSelectTimeSlot} />
            <Button className={classes.button} variant="success" onClick={onClickSignOut} >Sign Out</Button>
        </div>
    );
};

export {Home};
