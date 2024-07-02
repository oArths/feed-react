import styles from "./style.module.css"

export default function ModalDeltePost({ title, isOpen, onClickDelete, Delete, onClickConfirm, Confirm }) {

    if (isOpen) {
        return (
            <div className={styles.main}>
                <div className={styles.containerModal}>
                        <div className={styles.Title}>{title}</div>
                    <div className={styles.ConatinerModal}>
                        <button onClick={onClickDelete} className={styles.Button}>{Delete}</button>
                        <button onClick={onClickConfirm} className={styles.Button}>{Confirm}</button>
                    </div>
                </div>
            </div>
        )
    }
}
