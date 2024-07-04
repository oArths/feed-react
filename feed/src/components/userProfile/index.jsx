import styles from "./style.module.css"


export default function UserProfile({ UserImage, User, UserBio,onClickEditProfile, disabled }) {

    return (
        <div className={styles.card}>
            <div className={styles.userConatiner}>
                <div className={styles.UserInfo}>
                <div className={styles.UserName}>{User}</div>
                <div className={styles.UserBio}>{UserBio}</div>
                </div>
                <div className={styles.UserPhoto}>
                    <img className={styles.ImgeUser} src={UserImage} />
                </div>
            </div>
            <div className={styles.ButtonConatiner}>
                <button onClick={onClickEditProfile} disabled={disabled} className={styles.Button}>Editar perfil</button>
            </div>
            <div className={styles.Footer}>
                Publicações
            </div>
        </div>
    )
}