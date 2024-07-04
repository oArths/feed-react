import styles from "./style.module.css"
import { useToken } from "../../../context/UseToken"

export default function DropDownOptions({ IsOpen, Blur, UserEdit }) {
    const [token, setToken] = useToken()


    const UserDelete = () => {
        console.log("delete Post", token)
        // fetch('http://127.0.0.1:8000/api/auth/siguin/delete', {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Logout realizado com sucesso:', data);
        //         setToken(null);
        //         window.location.href = "/"
        //     })
        //     .catch((error) => {
        //         console.error('Erro ao realizar logout:', error);
        //     });


    }


    if (IsOpen) {
        return (
            // <div className={styles.blur} onClick={Blur}>
                <div className={styles.Container}>
                    <div className={styles.ConatinerUser} onClick={UserEdit}>
                        <div className={styles.verPerfil}>Editar</div>
                    </div>
                    <div className={styles.ConatinerLogOut} onClick={UserDelete}>
                        <div className={styles.LogOut}>Deletar</div>
                    </div>
                </div>
            // </div>
        )
    }
}