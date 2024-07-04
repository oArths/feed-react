import styles from "./style.module.css"
import { useToken } from "../../../context/UseToken"
import close from "../../../assests/imgs/xmark.svg"

export default function DropDownTags({ IsOpen, UserEdit, CloseOption }) {
    const [token, setToken] = useToken()
    const data = ['Arroz', 'Farrofa', 'Comida', 'Comida', 'Comida', 'Comida']

    if (IsOpen) {
        return (
        <div className={styles.main} onClick={(e) => e.stopPropagation()}>
            <div className={styles.ConatinerButton} onClick={CloseOption}>
                <img className={styles.Button} src={close} />
            </div>
            <div className={styles.Container} >
                {data.map((data, index) => (
                    <div key={index} className={styles.ConatinerUser} onClick={UserEdit}>
                        <div className={styles.verPerfil}>{data}</div>
                    </div>
                ))}
            </div>
        </div>
        )
    }
}