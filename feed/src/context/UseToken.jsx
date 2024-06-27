import { useContext } from "react";
import { TokenContext } from "./TokenContext";


export const useToken  = () =>{
    const {token, setToken } = useContext(TokenContext)
    return [token, setToken]
}