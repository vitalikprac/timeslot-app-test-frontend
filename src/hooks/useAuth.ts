import { useState } from "react";

type UseAuthReturnType = [boolean,string|null,any,(name:string,password:string,isSignIn:boolean)=>void]

type SetNameType = (name:string)=>void
type SetPasswordType = SetNameType

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const useAuth = (setName:SetNameType,setPassword:SetPasswordType):UseAuthReturnType=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string|null>(null);
    const [data,setData] = useState({});

    const authAsync = async(username:string,password:string,isSignIn:boolean)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${SERVER_URL}/${isSignIn?'signIn':'auth'}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
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
        setName('');
        setPassword('');
        setLoading(false);
    }

    return [loading,error,data,authAsync];
}
