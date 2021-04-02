import React, {useContext, useState} from 'react';

import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {SelectTimeSlot, WeekHours} from '../../components/SelectTimeSlot/SelectTimeSlot';
import {TokenContext} from "../../context/TokenContext";
import classes from './Home.module.scss';
import {fetchGetTimeSlot, fetchPostTimeSlot} from "../../util/util";



const Home = () => {

    const history = useHistory();
    const {setToken,token} = useContext(TokenContext);
    const [timeSlot,setTimeSlot] = useState({});

    useEffect(()=>{
        (async()=>{
            if (token) {
                const {timeSlot} = await fetchGetTimeSlot(token);
                if (timeSlot) {
                    setTimeSlot(timeSlot);
                }
            }
        })()
    },[token])

    const onSaveSelectTimeSlot = (weekHours:WeekHours)=>{
        fetchPostTimeSlot(token!,weekHours);
    }

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
