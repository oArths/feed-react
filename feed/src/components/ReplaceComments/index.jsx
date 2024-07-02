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
            <div className={styles.Header}>
                <div className={styles.Title}>
                    Respostas
                </div>
            </div>
            <div className={styles.ConatinerCommentarios}>
                <div className={styles.userConatiner}>
                    <div className={styles.UserPhoto}>
                        <img className={styles.ImgeUser} src={UserImage} />
                    </div>
                    <div className="UserName">{truncateText(User, 20)}</div>
                </div>
                <div className={styles.title}>
                        <textarea className={styles.input} type="text" maxLength={200}  value="sdkhdihds" disabled />
                    </div>
                    <div className="comentarios">
                <div className="commetsContainer">
                    <div className="Houver">
                        <img className="icon" src={Heart} onClick={onclickHeart} />
                        <div className="info">12</div>
                    </div>
                </div>
                <div className="commetsContainer">
                    <div className="Houver">
                        <img className="icon" src={Comments} onClick={onclickComments} />
                    <div className="info">79</div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}