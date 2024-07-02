import styles from "./style.module.css"

export default function ModalDeltePost({ title, isOpen, onClickDelete, Delete, onClickConfirm, Confirm }) {

    if (isOpen) {
        return (
            <div className={styles.main}>
                <div className={styles.containerModal}>
                        <div className={styles.Title}>{title}</div>
                    <div className={styles.ConatinerModal}>
                        <button onClick={onClickConfirm} className={styles.Button}>{Confirm}</button>
                        <button onClick={onClickDelete} className={styles.Button}>{Delete}</button>
                    </div>
                </div>
            </div>
        )
    }
}
