import styles from "./style.module.css"
import Comments from "../../assests/imgs/comments.svg"
import Heart from "../../assests/imgs/heart.svg"

export default function ReplaceComments({ UserImage, User, onclickHeart, onclickComments }) {

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
                        <img className={styles.ImgeUser} src={UserImage} />
                    </div>
                    <div className="UserName">{truncateText(User, 20)}</div>
                </div>
                <div className={styles.title}>
                    <textarea className={styles.input} type="text" maxLength={200} value="asaas" disabled />
                </div>
                <div className={styles.comentarios}>
                    <div className={styles.commetsContainer}>
                        <div className={styles.Houver}>
                            <img className={styles.icon} src={Heart} onClick={onclickHeart} />
                            <div className={styles.info}>12</div>
                        </div>
                    </div>
                    <div className={styles.commetsContainer}>
                        <div className={styles.Houver}>
                            <img className={styles.icon} src={Comments} onClick={onclickComments} />
                            <div className={styles.info}>79</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}