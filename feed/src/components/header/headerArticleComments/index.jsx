import styles from "./style.module.css"
import arrow from "../../../assests/imgs/arrow-left.svg"


export default function HeaderArticleComments({ onclickBack, Title }) {

    return (
        <div className={styles.Conatiner}>
            <div className={styles.Option}>
            <div className={styles.Home} onClick={onclickBack}>
                <img className={styles.img} src={arrow} />
            </div>
            <div className={styles.Title} >
                {Title}
            </div>
            </div>
        </div>
    )
}