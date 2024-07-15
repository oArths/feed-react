import styles from "./style.module.css"
import Comments from "../../assests/imgs/comments.svg"
import Heart from "../../assests/imgs/heart.svg"
import UserDefault from "../../assests/imgs/userdefault.jpg"
import HeartSolid from "../../assests/imgs/heart-solid.svg"

export default function ReplaceComments({ like, UserImage, User, onclickHeart, onclickComments, Content, HeartCount, CommentsCount }) {
    const baseURL = "http://127.0.0.1:8000/img/user/";

    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className={styles.container}>
            <div className={styles.ConatinerCommentarios}>
                <div className={styles.userConatiner}>
                    <div className={styles.UserPhoto}>
                        <img className={styles.ImgeUser} src={UserImage === null ? UserDefault : baseURL + UserImage} />
                    </div>
                    <div className="UserName">{truncateText(User, 20)}</div>
                </div>
                <div className={styles.title}>
                    <textarea className={styles.input} type="text" maxLength={200} value={Content} disabled />
                </div>
                <div className={styles.comentarios}>
                    <div className={styles.commetsContainer}>
                        <div className={styles.Houver} onClick={onclickHeart}>
                            {like ? 
                            (<img className={styles.icon} src={HeartSolid}  />)
                            :
                            (<img className={styles.icon} src={Heart}  />)}
                            
                            <div className={styles.info}>{HeartCount}</div>
                        </div>
                    </div>
                    <div className={styles.commetsContainer}>
                        <div className={styles.Houver} onClick={onclickComments}>
                            <img className={styles.icon} src={Comments}  />
                            <div className={styles.info}>{CommentsCount}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}