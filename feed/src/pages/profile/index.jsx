import styles from "./style.module.css"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import UserProfile from "../../components/userProfile"
import ModalUpdateuser from "../../components/modals/modalUpdateUser"
import { useState } from "react"

export default function Profile() {
    const [ModalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [image, setImage] = useState(null)

    return (
            <div className={styles.body}>

                <HeaderArticleComments
                    Title="Perfil"
                    onclickBack={() => (window.location.href = '/home')}
                />
                <div className={styles.feed}>
                    <UserProfile
                        User="asssssssd"
                        onClickEditProfile={() => setModalUpdateOpen(!ModalUpdateOpen)}
                    />
                </div>
<ModalUpdateuser
 setImage={setImage} 
 image={image}
isOpen={ModalUpdateOpen}
onClickBlur={() => setModalUpdateOpen(!true)}
/>
            </div>
    )
}