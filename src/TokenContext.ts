import React from 'react';



export const TokenContext = React.createContext<{
    token: string | null,
    setToken: React.Dispatch<string|null>
}>({
    token: null,
    setToken: ()=>null
});
