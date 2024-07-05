import {  createContext, useEffect, useState } from "react";


export const TokenContext = createContext();


export const TokenProvider = ({children}) => {
    const [token, setToken ] = useState(localStorage.getItem('token'));
    const [UserId, setUserId ] = useState(localStorage.getItem('UserId'));

    useEffect(() => {
        if(token){
            localStorage.setItem('token', token)
        }else{
            localStorage.removeItem('token')
        }
    }, [token])

    useEffect(() => {
        if(UserId){
            localStorage.setItem('UserId', UserId)
        }else{
            localStorage.removeItem('UserId')
        }
    }, [UserId])
    return (
        <TokenContext.Provider value={{token, setToken, UserId, setUserId}}>
            {children}
        </TokenContext.Provider>
    )
}