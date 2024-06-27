import { useState } from 'react';
import  './style.css';



export default function  Login (){

   const [values, setValues] = useState({
    username : "",
    email : "",
    password: "",
   })

 const Subbimt = () => {
    
    console.log(values)

 }
    return(
        <div className="Body">
            <div className="main">
                <div className="inputsContainer">
                    <div className="titlepage">
                        Login
                    </div>
                    <input type='text' onChange={(e)=>setValues({...values, username: e.target.value})} placeholder='User Name' className='inputLogin'/>
                    <input type='email' onChange={(e)=>setValues({...values, email: e.target.value})} placeholder='E-mail anddres' className='inputLogin'/>
                    <input type='password'onChange={(e)=>setValues({...values, password: e.target.value})} placeholder='Password' className='inputLogin'/>
                    <button className='buttonlogin' onClick={Subbimt}>Entrar</button>
                    <div className="forgot">Not a member yet? <a href="" className="sing">Sing Up</a></div>
                </div>
            </div>
        </div>
    )
}