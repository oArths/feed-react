import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"
import UserDefault from "../../assests/imgs/userdefault.jpg"
import { useState, useEffect } from "react"
import { useToken } from "../../context/UseToken"

export default function ModalComment({ IsOpen, CloseModal,
    UserImage, User, setImage, image, placeholderText, UserImageAwmser,
    UserAwnser, UserTextAwnser, ClearImage, articleId, commentsId, CloseFinaly }) {

    const baseURL = "http://127.0.0.1:8000/img/user/";
    const [tag, setTag] = useState("")
    const [text, setText] = useState("")
    const [imageFile, setImageFile] = useState(null);
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()



    const Subbmit = () => {
        const fromData = new FormData
        if (imageFile) {
            fromData.append('image', imageFile)
        }
        if (commentsId) {
            fromData.append('parent_id', commentsId)
        }
        fromData.append('user_id', UserId)
        fromData.append('article_id', articleId)
        fromData.append('content', text)

        fetch('http://127.0.0.1:8000/api/auth/comment', {
            method: 'POST',
            headers: {
                'Contente-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: fromData
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData
                    })
                }
                return response.json()
            })
            .then(data => {
                setModify(!modify)
                CloseFinaly()
            })
            .catch(error => {
                window.location.href = ''; 
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


    if (IsOpen) {
        return (
            <div className={styles.blur} onClick={CloseModal}>
                <div className={styles.Conatiner} onClick={(e) => { e.stopPropagation(); }}>
                    <div className={styles.header}>
                        <div>Responder</div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={UserImageAwmser === null ? UserDefault : baseURL + UserImageAwmser} />
                        </div>
                        <div className="UserName">{truncateText(UserAwnser, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea className={styles.inputAwnser} type="text" maxLength={200} value={UserTextAwnser} disabled />
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={UserImage === null ? UserDefault : baseURL + UserImage} />
                        </div>
                        <div className="UserName">{truncateText(User, 20)}</div>
                    </div>
                    <div className={styles.title}>
                        <textarea className={styles.input}
                            type="text"
                            maxLength={200}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`responda a ${placeholderText}`} />
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