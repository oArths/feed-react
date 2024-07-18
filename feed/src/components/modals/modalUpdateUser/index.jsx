import styles from "./style.module.css"
import { useState } from "react";
import { useToken } from "../../../context/UseToken"
import {UserInfo} from '../../../utils/';
import UserDefault from "../../../assests/imgs/userdefault.jpg"


export default function ModalUpdateuser({ isOpen, onClickBlur, setImage, image, UserValueName,
     UserValueDescription, close }) {
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()

    const [error, setError] = useState({})
    const [values, setValues] = useState({
        name: UserValueName,
        bio: UserValueDescription,
    })
    const handleInputChange = (field, value) => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const onClickUpdateUser = () => {
        const formData = new FormData

        if (image.file) {
            formData.append('image', image.file)
        } else {
            formData.append('imageName', userData[8])
        }
        if (values.bio) {
            formData.append('bio', values.bio)
        }

        formData.append('username', values.name)
        fetch('http://127.0.0.1:8000/api/auth/siguin/update/?_method=PUT', {
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
                UserInfo(token, setUserData)
                setModify(!modify)
                close()

            })
            .catch(error => {
                window.location.href = '';
            })

    }



    const openFileSelector = () => {
        document.querySelector(".input-files").click();
    };
    const baseURL = "http://127.0.0.1:8000/img/user/";
    console.log(image);
    if (isOpen) {
        return (

            <div className={styles.blur} onClick={onClickBlur}>
                <div className={styles.Container} onClick={(e) => { e.stopPropagation() }}>
                    <div className={styles.ConatinerImage}>
                        <div className={styles.UserPhoto} onClick={openFileSelector}>
                            {image.url === null && image.file === null ?(
                            <img className={styles.ImgeUser} src={UserDefault} />
                            ) : 
                            (<img className={styles.ImgeUser} src={image.url === null ? image.blob : baseURL + image.url   } />
                            )
                            }
                        </div>
                    </div>
                    <input type="file"
                        accept="image/*"
                        className="input-files"
                        hidden
                        onChange={({ target: { files } }) => {
                            if (files[0] && files) {
                                const imageFile = files[0];
                                const imageBlob = URL.createObjectURL(imageFile);
                                setImage({ file: imageFile, url: null, blob : imageBlob });
                            }
                        }}
                    />
                    <div className={styles.ConatinerInput}>

                        <div className={styles.InputConatiner}>
                            <div className={styles.Title}>Nome</div>
                            <input type='text'
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                value={values.name}
                                placeholder='Nome'
                                className={styles.inputLogin} />
                            <div className={styles.error}>{error && <div>{error.email}</div>}</div>
                        </div>

                        <div className={styles.InputConatiner}>
                            <div className={styles.Title}>Bio</div>
                            <input type='text'
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                maxLength={150}
                                value={values.bio}
                                placeholder='Bio'
                                className={styles.inputLogin} />
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