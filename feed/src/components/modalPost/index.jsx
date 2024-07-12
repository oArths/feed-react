import DropDownTags from "../dropdown/dropDownTag"
import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Trash from "../../assests/imgs/trash-solid.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"
import { useState, useEffect } from "react"
import { useToken } from "../../context/UseToken"

export default function ModalPost({ Title, IsOpen, CloseModal, Subbmit, ClearImage}) {

    const [modalTag, setmodalTag] = useState(false)
    const [ token, setToken, UserId, setUserId,userData, setUserData] = useToken()
 
 
    const [OptionSelect, setOptionSelect] = useState("");
    const [tag, setTag] = useState("")
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null); 
    const data = ['Arroz', 'Farrofa', 'Comida', 'Comida', 'Comida', 'Comida']
    const [error, setError] = useState({})


    const SubmitInfo = () => {
         const fromData = new FormData

         fromData.append('title', text)
         fromData.append('image', imageFile)
         fromData.append('description', "ds")
         fromData.append('title', text)
        fetch('http://127.0.0.1:8000/api/auth/articles', {
            method : 'POST',
            headers : {
                'Contente-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`

            },
            body : fromData
        })
        .then(response =>{
            if(!response.ok){
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            Subbmit()
            setError({})
        })
        .catch(error => {
            setError(error.erro || {});
            console.log('Error:', error.erro);
        })

    }

    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };


    const openFileSelector = () => {
        document.querySelector(".input-files").click();
    };

    useEffect(() => {
        if (ClearImage) {
            setImage(null);
            setImageFile(null);
        }
    }, [ClearImage]);

    const closeImage = () => {
        setImage(null);
        setImageFile(null);
    };

    const baseURL = "http://127.0.0.1:8000/img/user/";
    if (IsOpen) {
        return (
            <div className={styles.blur} onClick={CloseModal}>
                <div className={styles.Conatiner} onClick={(e) => { e.stopPropagation(); }}>
                    <div className={styles.header}>
                        <div>{Title}</div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={baseURL + userData[7]} />
                        </div>
                        <div className="UserName">{truncateText(userData[1], 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea
                            className={styles.input}
                            type="text"
                            
                            onChange={(e) => setText(e.target.value)}
                            maxLength={198} placeholder="O que você esta pensando?" />
                            <div className={styles.error}>{error && <div>{error.title}</div>}</div>
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
                    {!image ?
                        (<>
                            <input type="file"
                                accept="image/*"
                                className="input-files"
                                hidden
                                onChange={({ target: { files } }) => {

                                    if (files) {
                                        setImage(URL.createObjectURL(files[0]))
                                        setImageFile(files[0])
                                    } else {
                                        setImage(null)
                                        setImageFile(null)

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
                        <div className={styles.ConatinerImage} onClick={() => setmodalTag(!modalTag)}>
                            <img className={styles.FolderIcon} src={Hashtag} />
                        </div>
                    </div>
                    <div className={styles.ConatinerButton}>
                        <button onClick={SubmitInfo}>Publicar</button>
                    </div>
                </div>

                
            </div>
        )
    }
}