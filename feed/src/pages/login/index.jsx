import { useEffect, useState } from 'react';
import { useToken } from '../../context/UseToken';
import './style.css';



export default function Login() {

    const [error, setError] = useState({})
    const [ token , setToken,  userId, setUserId,userData, setUserData ] = useToken()
    const [values, setValues] = useState({
        email: "ismael87188@mydomain.com",
        password: "emonahan",
    })




    const Subbimt = () => {
        fetch('http://127.0.0.1:8000/api/siguin',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(values),
        })
        .then(response =>{
            if(!response.ok){
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            const newtoken =  data.token.split(" ")
            const IdUser = data.UserId
            setToken(newtoken[1])
            setUserId(IdUser)
            setError({});  
        })
        .catch(error => {
            setError(error.error || {});
            console.error('Error:', error);
        });
    }
    useEffect(()=>{
       if(userId){
        fetch('http://127.0.0.1:8000/api/auth/user', {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            }
        })
        .then(response =>{
            return response.json();
        })
        .then(data => {
            setUserData(Object.values(data.data))
            console.log("sssss",userData);
            window.location.href = '/home'
        })
        .catch(error => {
            console.error('Error userdata:', error.error);
        });

       }

    },[userId])

    return (
        <div className="Body">
            <div className="container">
                <div className="inputsContainer">
                    <div className="titlepage">
                        Login
                        <div className="subtitle">Entre com seus dados e tenha acesso a um mundo de possibilidades.</div>
                    </div>

                    <div className="conteinerInpits">
                    <input type='email' onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='E-mail' className='inputLogin' />
                    <div className="error">{error && <div>{error.email}</div>}</div>
                    </div>

                    <div className="conteinerInpits">
                    <input type='password' onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='Senha' className='inputLogin' />
                    <div className="error">{error && <div>{error.password}</div>}</div>
                    </div>

                    <div className="conteinerButton">
                        <button className='buttonlogin' onClick={Subbimt}>Entrar</button>
                    </div>
                    <div className="forgot">Não é membro? <a href="/cadastro" className="sing">Cadastre-se </a></div>
                </div>
            </div>
        </div>
    )
}