import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Folder from "../../assests/imgs/folder-plus.svg"
import Empty from "../../assests/imgs/empty-page.svg"
import Trash from "../../assests/imgs/trash-solid.svg"


import { useState } from "react"

export default function ModalPost({ IsOpen, CloseModal, Subbmit, UserImage, User }) {
    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("Sem Imagens Selecionadas")

    if (IsOpen) {
        return (
            <div className={styles.blur}>
                <div className={styles.Conatiner}>
                    <div className={styles.header}>
                        <div>Criar Publicação</div>
                        <div className={styles.imageContainer}>
                            <img className={styles.img} src={Close} />
                        </div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img src={UserImage} />
                        </div>
                        <div className="UserName">{truncateText(User, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea className={styles.input} type="text" maxLength={200} placeholder="O que você esta pensando?" />
                    </div>
                    <div className={styles.Image} onClick={() => document.querySelector(".input-files").click()}>
                        <input type="file"
                            accept="image/*"
                            className="input-files"
                            hidden
                            onChange={({ target: { files } }) => {
                                files[0] && setFileName(files[0].name)
                                if (files) {
                                    setImage(URL.createObjectURL(files[0]))
                                }
                            }}
                        />
                        {image ?
                            <div className={styles.ContainerImg}>
                                <img src={Close} onClick={() => { setImage(null) }} />
                                <img src={image} width={350} height={350} />
                            </div>
                            :
                            <div className={styles.ConatinerImage}>
                                <img className={styles.FolderIcon} src={Empty} />
                            </div>}
                    </div>
                    <div className="Description">
                        <textarea className={styles.input} type="text" maxLength={200} placeholder="O que é sua deacrição" />
                    </div>
                    <div className="ConatinerButton">
                        <button onClick={Subbmit}>Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}