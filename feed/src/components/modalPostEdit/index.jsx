import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"
import Trash from "../../assests/imgs/trash-solid.svg"
import DropDownTags from "../dropdown/dropDownTag"


import { useState } from "react"

export default function ModalPostEdit({ Title, IsOpen, CloseModal, Subbmit, UserImage, User,setImageEdit,imageEdit,   }) {

    const [modalTag, setmodalTag] = useState(false)
    const [OptionSelect, setOptionSelect] = useState("");
    const [tag, setTag] = useState("")
    const [text, setText ] =  useState("inicial")
    const data = ['Arroz', 'Farrofa', 'Comida', 'Comidgffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbba', 'Comida', 'Comida']

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
        setImageEdit(null);
    };

    const basePath = "/assets/imgs/";

    // Concatene o caminho base com o nome do arquivo recebido
    const dynamicImagePath = `${basePath}${imageEdit}`;
    if (IsOpen) {
        return (
            <div className={styles.blur} onClick={CloseModal}>
                    <div className={styles.Conatiner} onClick={(e) => { e.stopPropagation();}}>
                    <div className={styles.header}>
                        <div>{Title}</div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={UserImage} />
                        </div>
                        <div className="UserName">{truncateText(User, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea 
                        className={styles.input} 
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={200} placeholder="O que você esta pensando?" />
                         <div className={styles.ConatinerTags}>
                        <div className={styles.Tag} >{OptionSelect}</div>
                       {OptionSelect &&  <img className={styles.Delete} src={Trash} onClick={() => setOptionSelect("")}/>}
                    </div>
                    </div>
                    <DropDownTags
                    setOptionSelect={setOptionSelect}
                    option={data}
                    CloseOption={() => setmodalTag(!modalTag)}
                    IsOpen={modalTag}
                />
                    {!imageEdit ? 
                    (<>
                        <input type="file"
                            accept="image/*"
                            className="input-files"
                            hidden
                            onChange={({ target: { files } }) => {

                                if (files) {
                                    setImageEdit(URL.createObjectURL(files[0]))
                                } else {
                                    setImageEdit(null)
                                }
                            }}
                        />
                    </>
                    ) : (<div className={styles.ImageRender}>
                                <img className={styles.Close} src={Close} onClick={closeImage} />
                                <img src={dynamicImagePath} className={styles.imageFull} />
                    </div>)}
                    <div className={styles.Option}>
                       {!imageEdit && 
                       <div className={styles.ConatinerImage} onClick={openFileSelector}>
                            <img className={styles.FolderIcon} src={Photo} />
                        </div>}
                        <div className={styles.ConatinerImage} onClick={() => setmodalTag(!modalTag)}>
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