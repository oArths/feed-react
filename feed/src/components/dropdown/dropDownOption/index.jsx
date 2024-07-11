import styles from "./style.module.css"
import { useToken } from "../../../context/UseToken"

export default function DropDownOptions({ IsOpen, UserEdit, id }) {
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()


    const UserDelete = () => {
        console.log("delete Post")
        fetch(`http://127.0.0.1:8000/api/auth/articles/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post deletardo com sucesso:', data);
                setModify(!modify)
            })
            .catch((error) => {
                console.error('Erro ao apagar post', error);
            });


    }


    if (IsOpen) {
        return (
                <div className={styles.Container}>
                    <div className={styles.ConatinerUser} onClick={UserEdit}>
                        <div className={styles.verPerfil}>Editar</div>
                    </div>
                    <div className={styles.ConatinerLogOut} onClick={UserDelete}>
                        <div className={styles.LogOut}>Deletar</div>
                    </div>
                </div>
        )
    }
}