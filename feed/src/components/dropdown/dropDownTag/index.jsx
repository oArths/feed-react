import styles from "./style.module.css"
import close from "../../../assests/imgs/xmark.svg"

export default function DropDownTags({ IsOpen ,setOptionSelect, CloseOption, option }) {

    if (IsOpen) {
        return (
        <div className={styles.main} onClick={(e) => e.stopPropagation()}>
            <div className={styles.ConatinerButton} onClick={CloseOption}>
                <img className={styles.Button} src={close} />
            </div>
            <div className={styles.Container} >
                {option.map((option, index) => (
                    <div key={index} className={styles.ConatinerUser} onClick={()=>(setOptionSelect(option))}>
                        <div className={styles.verPerfil}>{option}</div>
                    </div>
                ))}
            </div>
        </div>
        )
    }
}