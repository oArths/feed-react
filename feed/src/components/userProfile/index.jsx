import styles from "./style.module.css"
import UserDefault from "../../assests/imgs/userdefault.jpg"


export default function UserProfile({ UserImage, User, UserBio,onClickEditProfile, disabled }) {
    const truncateText = (text, maxLength,) => {
        if (!text) return '';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    return (
        <div className={styles.card}>
            <div className={styles.userConatiner}>
                <div className={styles.UserInfo}>
                <div className={styles.UserName}>{ truncateText(User, 20)}</div>
                <div className={styles.UserBio}>{truncateText(UserBio, 100)}</div>
                </div>
                <div className={styles.UserPhoto}>
                    <img className={styles.ImgeUser} src={UserImage === null ? UserDefault : UserImage} />
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