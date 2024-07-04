import styles from "./style.module.css"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import UserProfile from "../../components/userProfile"
import ModalUpdateuser from "../../components/modals/modalUpdateUser"
import CardAricle from "../../components/card/cardArticle"
import DropDownOptions from "../../components/dropdown/dropDownOption"
import ModalPost from "../../components/modalPost"
import { useState } from "react"

export default function Profile() {
    const [ModalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [ModalEdit, setModalEdit] = useState(false)
    const [ModalEditPost, setModalEditPost] = useState(false)
    const [image, setImage] = useState(null)
    const [imageEdit, setImageEdit] = useState("")

    const UpdateUser = () => {
        setModalUpdateOpen(false)
    }

    return (
        <div className={styles.body}>

            <HeaderArticleComments
                Title="Perfil"
                onclickBack={() => (window.location.href = '/home')}
            />
            <div className={styles.feed}>
                <UserProfile
                    User="asssssssd"
                    UserBio="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa"
                    onClickEditProfile={() => setModalUpdateOpen(!ModalUpdateOpen)}
                />
     
                <div className={styles.cardConatiner}>
                    
                <CardAricle
                    IsUser={true}
                    onclickOptins={() => setModalEdit(!ModalEdit)}
                />
                <DropDownOptions
            Blur={() => setModalEdit(!ModalEdit)}
            IsOpen={ModalEdit}
            UserEdit={() => (setModalEditPost(!ModalEditPost), setModalEdit(!ModalEdit))}
            />
                </div>
            </div>
            <ModalPost
            Title="Editar publicação"
            // Subbmit={() => setModalEditPost(!ModalEditPost)} 
            CloseModal={() => setModalEditPost(!ModalEditPost)}  
            setImageEdit={setImageEdit} 
            imageEdit={imageEdit}
            IsOpen={ModalEditPost}
            />

            <ModalUpdateuser
                onClickUpdateUser={() => UpdateUser()}
                setImage={setImage}
                image={image}
                isOpen={ModalUpdateOpen}
                onClickBlur={() => setModalUpdateOpen(!true)}
            />
            
        </div>
    )
}