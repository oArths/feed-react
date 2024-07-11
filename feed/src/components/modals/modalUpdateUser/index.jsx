import styles from "./style.module.css"
import { useState } from "react";
export default function ModalUpdateuser({ isOpen, onClickBlur, setImage, image, onClickUpdateUser, UserValueName, UserValueDescription }) {

    const [error, setError] = useState({})
    const [values, setValues] = useState({
        email: "teste@gmail3.com",
        password: "aaaaaaaa3",
    })
    


    const openFileSelector = () => {
        document.querySelector(".input-files").click();
    };
    const baseURL = "http://127.0.0.1:8000/img/user/";

    if (isOpen) {
        return (

            <div className={styles.blur} onClick={onClickBlur}>
                <div className={styles.Container} onClick={(e) => { e.stopPropagation() }}>
                   <div className={styles.ConatinerImage}>
                   <div className={styles.UserPhoto} onClick={openFileSelector}>
                        <img className={styles.ImgeUser} src={baseURL + image} />
                    </div>
                   </div>
                    <input type="file"
                        accept="image/*"
                        className="input-files"
                        hidden
                        onChange={({ target: { files } }) => {

                            if (files) {
                                setImage(URL.createObjectURL(files[0]))
                            } else {
                                setImage(null)
                            }
                        }}
                    />
                    <div className={styles.ConatinerInput}>

                        <div className={styles.InputConatiner}>
                            <div className={styles.Title}>Nome</div>
                            <input type='text' onChange={(e) => setValues({ ...values, email: e.target.value })} value={UserValueName} placeholder='Nome'className={styles.inputLogin} />
                            <div className={styles.error}>{error && <div>{error.email}</div>}</div>
                        </div>

                        <div className={styles.InputConatiner}>
                            <div className={styles.Title}>Bio</div>
                            <input type='text' onChange={(e) => setValues({ ...values, email: e.target.value })} maxLength={150} value={UserValueDescription} placeholder='E-mail' className={styles.inputLogin} />
                            <div className={styles.error}>{error && <div>{error.email}</div>}</div>
                        </div>

                        <div className={styles.ConatinerButton}>
                            <button onClick={onClickUpdateUser}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}