import {ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

type useAuthReturnType = [
    string,
    ChangeEventHandler<HTMLInputElement>,
    string,
    ChangeEventHandler<HTMLInputElement>]

export const useFormAuth = ():useAuthReturnType=>{
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const onChangeName = (event:ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value);
    }

    const onChangePassword = (event:ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value);
    }

    return [name,onChangeName,password,onChangePassword];
}

