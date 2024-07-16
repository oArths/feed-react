import { useState } from 'react';
import { useToken } from '../../context/UseToken';
import './style.css';
import {UserInfo} from '../../utils';



export default function Login() {

    const [error, setError] = useState({})
    const [token, setToken, userId, setUserId, userData, setUserData] = useToken()
    const [values, setValues] = useState({
        email: "arthur@gmail.com",
        password: "@Arthur0017",
    })




    const Subbimt = () => {
        fetch('http://127.0.0.1:8000/api/siguin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
                return response.json();
            })
            .then(data => {
                const newtoken = data.token.split(" ")
                const IdUser = data.UserId
                setToken(newtoken[1])
                setUserId(IdUser)
                return UserInfo(newtoken[1], setUserData)

            })
            .then(userInfoSuccess => {
                if (userInfoSuccess) {
                    window.location.href = '/home';
                    setError({});
                } else {
                    console.log('Erro ao obter informações do usuário', userInfoSuccess);
                }
            })
            .catch(error => {
                setError(error.error || {});
                console.error('Error:', error);
            });
    }

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