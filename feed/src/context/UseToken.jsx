import { useContext } from "react";
import { TokenContext } from "./TokenContext";


export const useToken  = () =>{
    const {token, setToken, UserId, setUserId } = useContext(TokenContext)
    return [token, setToken, UserId, setUserId]
}