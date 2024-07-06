import {  createContext, useEffect, useState } from "react";


export const TokenContext = createContext();


export const TokenProvider = ({children}) => {
    const [token, setToken ] = useState(localStorage.getItem('token') || null);
    const [UserId, setUserId ] = useState(localStorage.getItem('UserId')|| null);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))


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
    
    useEffect(()=>{
        if(userData){
            localStorage.setItem('userData', JSON.stringify(userData))
        }else{
            localStorage.removeItem('userData')
        }
    },[userData])
    return (
        <TokenContext.Provider value={{token, setToken, UserId, setUserId, userData, setUserData}}>
            {children}
        </TokenContext.Provider>
    )
}