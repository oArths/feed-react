import { useState } from 'react';
import { useToken } from '../../context/UseToken';
import styles from './style.module.css';
import { UserInfo } from '../../utils';



export default function Login() {

    const [error, setError] = useState({})
    const [token, setToken, userId, setUserId, userData, setUserData] = useToken()
    const [values, setValues] = useState({
        email: "arthur@gmail.com",
        password: "@Arthur0017",
    })

    // email: "arthur@gmail.com",
    // password: "@Arthur0017",


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
        <div className={styles.Body}>
            <div className={styles.Main}>
            <div className={styles.Conainerimage}>
                    <div className={styles.Image}>
                        <div className={styles.ImageTitle}>
                                Feed
                        </div>
                        <div className={styles.subtitle}>Entre e tenha acesso a um mundo de possibilidades e publicações escolhidas para você</div>

                    </div>
                </div>
                <div className={styles.ConatinerInputsMain}>
                    
                <div className={styles.container}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.ConatinerTitlepage}>
                            <div className={styles.titlepage}>
                                Entre com sua Conta
                            </div>
                            <div className={styles.forgot}>Não é membro?
                                <a href="/cadastro" className="sing"> Cadastre-se</a>
                            </div>
                        </div>
                        <div className={styles.conatiner}>
                            
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
                            <button className={styles.buttonlogin} onClick={Subbimt}>Entrar</button>
                        </div>

                    </div>
                </div>
                </div>
            
            </div>
        </div>
    )
}