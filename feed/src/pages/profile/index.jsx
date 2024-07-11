import styles from "./style.module.css"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import UserProfile from "../../components/userProfile"
import ModalUpdateuser from "../../components/modals/modalUpdateUser"
import CardAricle from "../../components/card/cardArticle"
import ModalPostEdit from "../../components/modalPostEdit/index"
import { useState, useEffect } from "react"
import { useToken } from "../../context/UseToken"

export default function Profile() {
    const [ModalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [ModalEdit, setModalEdit] = useState(false)
    const [ModalEditPost, setModalEditPost] = useState(false)
    const [imageEdit, setImageEdit] = useState(null)
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()
    const [image, setImage] = useState(userData[7])
    const [Article, setArticle] = useState([])
    const [like, setLike] = useState(false)

    const baseURL = "http://127.0.0.1:8000/img/user/";




    
    const LikePost = (articleId, Liked) => {
        const method = Liked ? 'DELETE' : 'POST';
            fetch(`http://127.0.0.1:8000/api/auth/like/article`, {
                method : method,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'article_id': articleId,
                    'user_id': UserId
                })
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(method === 'POST' ? "curtiu" : "descurtiu", data);
                setLike(!like)
            })
            .catch(error => {
                console.log("erro",error.error)
            })
        
    }
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/auth/articles/user/${UserId}`,{
            method  : 'GET',
            headers : {
                'Content-Type' : 'appiclation/json',
                'Authorization' : `Bearer ${token}` 
            },
        }) 
        .then(response => {
            if(!response.ok){
                return response.json().then(errorData => {
                    throw errorData
                })
            }
            return response.json()
        })
        .then(data =>{
            setArticle(data.data)
            console.log(data);
            
        })
        .catch(error =>{
            console.log("error", error)
        })
    }, [like, modify])


    return (
        <div className={styles.body}>

            <HeaderArticleComments
                Title="Perfil"
                onclickBack={() => (window.location.href = '/home')}
            />
            <div className={styles.feed}>
                <UserProfile
                    User={userData[1]}
                    UserImage={baseURL + userData[7]}
                    UserBio="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa"
                    onClickEditProfile={() => setModalUpdateOpen(!ModalUpdateOpen)}
                    disabled={ModalEdit}
                />

                <div className={styles.cardConatiner}>

                    {Article.map((Article, index) => (
                        <div key={index} >
                            <CardAricle
                                IsUser={true}
                                PostIndex={index}
                                UserImage={baseURL + userData[7]}
                                CommentsCount={Article.comments_count}
                                HeartCount={Article.likes_count}
                                like={Article.liked_by_user}
                                image={Article.image}
                                onclickHeart={()=> (LikePost(Article.id, Article.liked_by_user))}
                                onclickComments={() => (window.location.href = '/home/article')}
                                User={userData[1]}
                                Title={Article.title} 
                                PostId={Article.id}
                                />

                    
                        </div>
                    ))}

                </div>
            </div>
            <ModalPostEdit
                Title="Editar publicação"
                // Subbmit={() => setModalEditPost(!ModalEditPost)} 
                CloseModal={() => setModalEditPost(!ModalEditPost)}
                setImageEdit={setImageEdit}
                imageEdit={imageEdit}
                IsOpen={ModalEditPost}
            />

            <ModalUpdateuser
                UserValueName={userData[1]}
                UserValueDescription={userData[1]}
                // onClickUpdateUser={() => UpdateUser()}
                setImage={setImage}
                image={image}
                isOpen={ModalUpdateOpen}
                onClickBlur={() => setModalUpdateOpen(!ModalUpdateOpen)}
            />

        </div>
    )
}