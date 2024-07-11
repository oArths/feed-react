import styles from "./style.module.css"
import Close from "../../assests/imgs/xmark.svg"
import Photo from "../../assests/imgs/media-image-list.svg"
import Hashtag from "../../assests/imgs/hashtag.svg"
import Trash from "../../assests/imgs/trash-solid.svg"
import DropDownTags from "../dropdown/dropDownTag"
import { useToken } from "../../context/UseToken"
import { useState, useEffect } from "react"

export default function ModalPostEdit({ Title,Description, IsOpen, CloseModal,
     UserImage, User,setImageEdit,imageEdit,idPost, ClearImage,closeImage   }) {

    const [ token, setToken, UserId, setUserId,userData, setUserData] = useToken()
    const [modalTag, setmodalTag] = useState(false)
    const [OptionSelect, setOptionSelect] = useState("");
    const [tag, setTag] = useState("")
    const [text, setText ] =  useState(Description)
    const [imageFile, setImageFile] = useState(null); 

    const data = ['Arroz', 'Farrofa', 'Comida', 'Comidgffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbba', 'Comida', 'Comida']

    const Subbmit = () => {
        const formData = new FormData
        formData.append('title', text)
        formData.append('image', imageFile)
        formData.append('description', "ds")
        formData.append('title', text)
        formData.append('id', idPost)
       fetch('http://127.0.0.1:8000/api/auth/articles/update/?_method=PUT', {
           method : 'POST',
           headers : {
               'Contente-Type' : 'application/json',
               'Authorization' : `Bearer ${token}`

           },
           body : formData
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
           IsOpen(false)
       })
       .catch(error => {
           console.log('Error:', error.erro);
       })



    }
    useEffect(() => {
        if (ClearImage) {
            setImageEdit(null);
            setImageFile(null);
        }
    }, [ClearImage]);




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


    // const closeImage = () => {
    //     setImageEdit(null)
    //     setImageFile(null)    
    // };

    const baseURL = "http://127.0.0.1:8000/img/user/";
    // Concatene o caminho base com o nome do arquivo recebido
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
                    {imageEdit && imageFile === null  ? 
                    (<>
                        <input type="file"
                            accept="image/*"
                            className="input-files"
                            hidden
                            onChange={({ target: { files } }) => {

                                if (files && files[0]) {
                                    setImageEdit(URL.createObjectURL(files[0]))
                                    setImageFile(files[0])
                                } else {
                                    setImageEdit(null)
                                    setImageFile(null)
                                }
                            }}
                        />
                    </>
                    ) : (
                        imageEdit && imageFile !== null && 
                    <div className={styles.ImageRender}>
                                <img className={styles.Close} src={Close} onClick={closeImage} />
                                <img src={imageEdit} className={styles.imageFull} />
                    </div>)}
                    <div className={styles.Option}>
                       {imageEdit && imageFile === null && 
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