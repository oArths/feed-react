import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"



import { useState } from "react"

export default function ModalComment({ IsOpen, CloseModal, Subbmit, UserImage, User,setImage,image, UserImageAwmser, UserAwnser, UserTextAwnser  }) {

    const [tag, setTag] = useState("")

    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    const CreateTag = () => {
        console.log(tag)
    }

    const openFileSelector = () => {
        document.querySelector(".input-files").click();
    };


    const closeImage = () => {
        setImage(null);
    };


    if (IsOpen) {
        return (
            <div className={styles.blur} onClick={CloseModal}>
                    <div className={styles.Conatiner} onClick={(e) => { e.stopPropagation();}}>
                    <div className={styles.header}>
                        <div>Responder</div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={UserImageAwmser} />
                        </div>
                        <div className="UserName">{truncateText(UserAwnser, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea className={styles.inputAwnser} type="text" maxLength={200} value={UserTextAwnser} disabled />
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={UserImage} />
                        </div>
                        <div className="UserName">{truncateText(User, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea className={styles.input} type="text" maxLength={200} placeholder={`responda a ${IsOpen}`} />
                    </div>
                    {!image ? 
                    (<>
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
                    </>
                    ) : (<div className={styles.ImageRender}>
                                <img className={styles.Close} src={Close} onClick={closeImage} />
                                <img src={image} className={styles.imageFull} />
                    </div>)}
                    <div className={styles.Option}>
                       {!image && 
                       <div className={styles.ConatinerImage} onClick={openFileSelector}>
                            <img className={styles.FolderIcon} src={Photo} />
                        </div>}
                        <div className={styles.ConatinerImage} onClick={openFileSelector}>
                            <img className={styles.FolderIcon} src={Hashtag} />
                        </div>
                       </div>
                    <div className={styles.ConatinerButton}>
                        <button onClick={Subbmit}>Publicar</button>
                    </div>
                </div>
            </div>
        )
    }
}