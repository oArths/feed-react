import { useState } from 'react';
import { useToken } from '../../context/UseToken';
import Modal from '../../components/modals/modalConfim';
import styles from './style.module.css';



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
        window.location.href = '/'
    }


    const Subbimt = () => {
        fetch('http://127.0.0.1:8000/api/singup', {
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
                const token = data.token.split(" ")
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
        <div className={styles.Body}>
            <div className={styles.Main}>
                <div className={styles.Conainerimage}>
                    <div className={styles.Image}>
                        <div className={styles.ImageTitle}>
                            Feed
                        </div>
                        <div className={styles.subtitle}>Se cadastre e tenha acesso a um mundo de possibilidades feito pra você</div>

                    </div>
                </div>
                <div className={styles.ConatinerInputsMain}>
                    <div className={styles.container}>
                        <div className={styles.inputsContainer}>
                        <div className={styles.ConatinerTitlepage}>
                            <div className={styles.titlepage}>
                              Crie sua conta  
                                <div className={styles.forgotCadastro}>Já é membro? <a href="/" className="sing">Entre já</a></div>
                            </div>
                            </div>
                            <div className={styles.conatiner}>
                                <div className={styles.conteinerInpits}>
                                    <input type='text' onChange={(e) => setValues({ ...values, username: e.target.value })} placeholder='User Name' className={styles.inputLogin} />
                                    <div className={styles.error}>{error && <div>{error.username}</div>}</div>
                                </div>

                                <div className={styles.conteinerInpits}>
                                    <input type='email' onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='E-mail' className={styles.inputLogin} />
                                    <div className={styles.error}>{error && <div>{error.email}</div>}</div>
                                </div>

                                <div className={styles.conteinerInpits}>
                                    <input type='password' onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='Senha' className={styles.inputLogin} />
                                    <div className={styles.error}>{error && <div>{error.password}</div>}</div>
                                </div>
                            </div>
                            <div className={styles.conteinerButton}>

                                <button className={styles.buttonlogin} onClick={Subbimt}>Criar</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <Modal
                    title="Cadastro Concluido"
                    subTitle="Seu cadastro foi concluido com sucesso"
                    button='Confirmar'
                    isOpen={ModalOpen}
                    onClick={redrection}
                    setOpenModal={() => setOpenModal(!ModalOpen)} />
            </div>
        </div>
    )
}