import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"
import Trash from "../../assests/imgs/trash-solid.svg"
import DropDownTags from "../dropdown/dropDownTag"
import { useToken } from "../../context/UseToken"
import { useState, useEffect } from "react"

export default function ModalPostEdit({ Title, Description, IsOpen, CloseModal,
    UserImage, User, setImageEdit, imageEdit, idPost, ClearImage, CloseIsOpen }) {

    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()
    const [modalTag, setmodalTag] = useState(false)
    const [OptionSelect, setOptionSelect] = useState("");
    const [tag, setTag] = useState("")
    const [text, setText] = useState(Description)
    const baseURL = "http://127.0.0.1:8000/img/user/";

    const data = ['Arroz', 'Farrofa', 'Comida', 'Comidgffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbba', 'Comida', 'Comida']

    const Subbmit = () => {
        const formData = new FormData

        if (imageEdit.file) {
            formData.append('image', imageEdit.file)
        }



        formData.append('title', text)
        formData.append('description', "ds")
        formData.append('title', text)
        formData.append('id', idPost)
        fetch('http://127.0.0.1:8000/api/auth/articles/update/?_method=PUT', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`

            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
                return response.json();
            })
            .then(data => {
                setModify(!modify)
                CloseIsOpen()
            })
            .catch(error => {
                window.location.href = '';;
            })
    }

    const fetchPostData = () => {
        fetch(`http://127.0.0.1:8000/api/auth/articles/all/${idPost}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setText(data.data.title);
                setImageEdit({ file: null, url: data.data.image === null ? null : baseURL + data.data.image });
            })
            .catch(error => {
                window.location.href = '';
            });
    };


    useEffect(() => {
        if (IsOpen) {
            fetchPostData();
        }
    }, [IsOpen]);

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


    const closeImage = () => {
        setImageEdit({ file: null, url: null })
    };

    if (IsOpen) {
        return (
            <div className={styles.blur} onClick={CloseModal}>
                <div className={styles.Conatiner} onClick={(e) => { e.stopPropagation(); }}>
                    <div className={styles.header}>
                        <div>{Title}</div>
                    </div>
                    <div className={styles.userConatiner}>
                        <div className={styles.UserPhoto}>
                            <img className={styles.ImgeUser} src={baseURL + UserImage} />
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
                            {OptionSelect && <img className={styles.Delete} src={Trash} onClick={() => setOptionSelect("")} />}
                        </div>
                    </div>
                    <DropDownTags
                        setOptionSelect={setOptionSelect}
                        option={data}
                        CloseOption={() => setmodalTag(!modalTag)}
                        IsOpen={modalTag}
                    />
                    <input type="file"
                        accept="image/*"
                        className="input-files"
                        hidden
                        onChange={({ target: { files } }) => {
                            if (files[0] && files) {
                                const imageFile = files[0];
                                const imageUrl = URL.createObjectURL(imageFile);
                                setImageEdit({ file: imageFile, url: imageUrl });
                            }
                        }}
                    />
                    {imageEdit.url !== null &&

                        <div className={styles.ImageRender}>
                            <img className={styles.Close} src={Close} onClick={closeImage} />
                            <img src={imageEdit.url} className={styles.imageFull} />

                        </div>}

                    <div className={styles.Option}>
                        {imageEdit.url === null &&
                            <div className={styles.ConatinerImage} onClick={openFileSelector}>
                                <img className={styles.FolderIcon} src={Photo} />
                            </div>}
                        <div className={styles.ConatinerImage} onClick={() => setmodalTag(!modalTag)}>
                            <img className={styles.FolderIcon} src={Hashtag} />
                        </div>
                    </div>
                    <div className={styles.ConatinerButton}>
                        <button onClick={Subbmit}>Salvar</button>
                    </div>
                </div>
            </div>
        )
    }
}