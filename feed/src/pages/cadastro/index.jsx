import { useState } from 'react';
import { useToken } from '../../context/UseToken';
import Modal from '../../components/modals/modalConfim';
import './style.css';



export default function Cadastro() {

    const [error, setError] = useState({})
    const [, setToken] = useToken()
    const [ModalOpen, setOpenModal] = useState(false);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    })
    const redrection = () => {
        window.location.href = 'https://www.youtube.com/watch?v=wiIbol5tZaI'
    }


    const Subbimt = () => {
        fetch('http://127.0.0.1:8000/api/singup',{
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
            const token =  data.token.split(" ")
            setToken(token[1])
            setOpenModal(true);
            setError({});  
        })
        .catch(error => {
            setError(error.error || {});
            console.error('Error:', error.error);
        });
    }

    return (
        <div className="Body">
            <div className="container">
                <div className="inputsContainer">
                    <div className="titlepage">
                        Cadastro
                        <div className="subtitle">Se cadastre e tenha acesso a um mundo de possibilidades.</div>
                    </div>
                    <div className="conteinerInpits">
                    <input type='text' onChange={(e) => setValues({ ...values, username: e.target.value })} placeholder='User Name' className='inputLogin' />
                    <div className="error">{error && <div>{error.username}</div>}</div>
                    </div>

                    <div className="conteinerInpits">
                    <input type='email' onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='E-mail' className='inputLogin' />
                    <div className="error">{error && <div>{error.email}</div>}</div>
                    </div>

                    <div className="conteinerInpits">
                    <input type='password' onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='Senha' className='inputLogin' />
                    <div className="error">{error && <div>{error.password}</div>}</div>
                    </div>

                    <button className='buttonlogin' onClick={Subbimt}>Criar</button>
                    <div className="forgotCadastro">Já é membro? <a href="/" className="sing">Entre já</a></div>
                </div>
            </div>
            <Modal 
            title="Cadastro Concluido" 
            subTitle="Seu cadastro foi concluido com sucesso" 
            button='Confirmar'
            isOpen={ModalOpen}
            onClick={redrection}
            setOpenModal={() => setOpenModal(!ModalOpen)}/>
        </div>
    )
}