import styles from "./style.module.css"


export default function DropDownOptions({ IsOpen, UserEdit, id, UserDelete}) {


   


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